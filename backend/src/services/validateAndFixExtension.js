const path = require('path')

function normalizeFilename(filename) {
  return String(filename || '').trim()
}

function parseManifest(files) {
  const manifestFile = files.find((f) => normalizeFilename(f.filename) === 'manifest.json')
  if (!manifestFile) throw new Error('Missing manifest.json')

  let manifest
  try {
    manifest = JSON.parse(String(manifestFile.content))
  } catch (e) {
    throw new Error('manifest.json is not valid JSON')
  }

  return { manifest, manifestFile }
}

function collectReferencedFiles(manifest) {
  const referenced = new Set()

  // action / default_popup
  if (manifest.action && typeof manifest.action === 'object') {
    const popup = manifest.action.default_popup
    if (popup) referenced.add(normalizeFilename(popup))
  }

  // browser_action (MV2 legacy, still harmless)
  if (manifest.browser_action && typeof manifest.browser_action === 'object') {
    const popup = manifest.browser_action.default_popup
    if (popup) referenced.add(normalizeFilename(popup))
  }

  // icons
  const iconObj = manifest.icons
  if (iconObj && typeof iconObj === 'object') {
    for (const size of Object.keys(iconObj)) {
      const iconPath = iconObj[size]
      if (iconPath) referenced.add(normalizeFilename(iconPath))
    }
  }

  return referenced
}

function getAvailableFilenames(files) {
  return new Set(files.map((f) => normalizeFilename(f.filename)))
}

function hasFile(files, filename) {
  const target = normalizeFilename(filename)
  return files.some((f) => normalizeFilename(f.filename) === target)
}

function upsertFile(files, filename, content) {
  const target = normalizeFilename(filename)
  const idx = files.findIndex((f) => normalizeFilename(f.filename) === target)
  if (idx >= 0) {
    files[idx] = { filename: target, content: String(content) }
  } else {
    files.push({ filename: target, content: String(content) })
  }
}

function createDefaultIconPngDataUrl(colorHex) {
  // Tiny placeholder PNG (1x1) - avoids needing to rely on AI generating icons.
  // This is not a real icon asset, but prevents Chrome "Could not load icon" / manifest errors.
  // Using a data URL placeholder file is not supported in manifest, so we provide a real binary.
  // We generate a minimal SVG-like PNG replacement via base64 is still PNG bytes.
  // 1x1 transparent PNG:
  const transparentPngBase64 =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+X9a8AAAAASUVORK5CYII='
  // We ignore colorHex, keep deterministic.
  return Buffer.from(transparentPngBase64, 'base64')
}

function createPngFileContentBase64(colorHex) {
  // Returns a binary string for a tiny 1x1 PNG.
  // zipService writes file content as UTF-8 text; however Node's archiver will include bytes from the string.
  // For compatibility with Chrome's icon loader, the file must contain valid PNG bytes.
  // Using `latin1` preserves byte values 0-255 when converting Buffer -> string.
  const pngBuf = createDefaultIconPngDataUrl(colorHex)
  return pngBuf.toString('latin1')
}


function fixIcons(manifest, files) {
  if (!manifest.icons || typeof manifest.icons !== 'object') return { manifest, files }

  const available = getAvailableFilenames(files)

  const iconKeys = Object.keys(manifest.icons)

  for (const size of iconKeys) {
    const iconPath = manifest.icons[size]
    const target = normalizeFilename(iconPath)

    if (!target) continue

    if (!available.has(target)) {
      // Auto-fix: include a deterministic placeholder icon.
      // Use the referenced path name (icon16.png/icon48.png/icon128.png etc.)
      const filename = target
      const binaryContent = createPngFileContentBase64('#000000')
      upsertFile(files, filename, binaryContent)
    }
  }

  return { manifest, files }
}

function stripMissingIconReferences(manifest) {
  if (!manifest.icons || typeof manifest.icons !== 'object') return manifest

  const iconObj = manifest.icons
  const newIcons = {}
  for (const size of Object.keys(iconObj)) {
    const iconPath = iconObj[size]
    if (iconPath) newIcons[size] = normalizeFilename(iconPath)
  }
  manifest.icons = newIcons
  return manifest
}

function validateAndFix(files) {
  if (!Array.isArray(files)) throw new Error('Invalid files array')

  // Clone (do not mutate input array reference)
  const fixedFiles = files.map((f) => ({ filename: normalizeFilename(f.filename), content: f.content }))

  let { manifest } = parseManifest(fixedFiles)

  const referenced = collectReferencedFiles(manifest)
  const available = getAvailableFilenames(fixedFiles)

  // Ensure core required files exist (AI should include these; fail fast if missing)
  const requiredCore = ['content.js', 'manifest.json']
  for (const reqFile of requiredCore) {
    if (!available.has(reqFile)) {
      throw new Error(`Missing required file: ${reqFile}`)
    }
  }

  // popup.html / popup.js: if referenced but missing, fail fast (we can't reliably invent UI)
  // icons: we can auto-fix by injecting placeholder PNG bytes.
  for (const referencedFile of referenced) {
    if (!referencedFile) continue

    if (referencedFile.startsWith('icon')) {
      // handled via icons section; we'll fix there
      continue
    }

    if (!available.has(referencedFile)) {
      // Auto-fix strategy: if action popup is missing, remove popup reference.
      if (referencedFile === 'popup.html') {
        if (manifest.action) manifest.action.default_popup = undefined
        if (manifest.browser_action) manifest.browser_action.default_popup = undefined
      } else {
        throw new Error(`Missing referenced file: ${referencedFile}`)
      }
    }
  }

  // Fix icons: if manifest.icons references files that are missing, inject placeholders.
  if (manifest.icons && typeof manifest.icons === 'object') {
    let fixed = fixIcons(manifest, fixedFiles)
    manifest = fixed.manifest
    fixedFiles.length = 0
    fixedFiles.push(...fixed.files)


    // Re-stringify manifest into fixedFiles[manifest.json]
    const manifestIndex = fixedFiles.findIndex((f) => normalizeFilename(f.filename) === 'manifest.json')
    fixedFiles[manifestIndex] = {
      filename: 'manifest.json',
      content: JSON.stringify(manifest, null, 2)
    }
  }

  // Strip any now-undefined default_popup keys if present
  if (manifest.action && typeof manifest.action === 'object') {
    if (!manifest.action.default_popup) delete manifest.action.default_popup
  }
  if (manifest.browser_action && typeof manifest.browser_action === 'object') {
    if (!manifest.browser_action.default_popup) delete manifest.browser_action.default_popup
  }

  // Final validation: re-parse manifest.json after persistence.
  const finalManifest = JSON.parse(
    String(fixedFiles.find((f) => normalizeFilename(f.filename) === 'manifest.json')?.content || '{}')
  )

  const finalReferenced = collectReferencedFiles(finalManifest)
  const finalAvailable = getAvailableFilenames(fixedFiles)

  // icons: should exist now or be absent from manifest
  for (const rf of finalReferenced) {
    if (!rf) continue
    if (!finalAvailable.has(rf)) {
      // If it's an icon path, remove it from manifest so Chrome won't error.
      if (finalManifest.icons && typeof finalManifest.icons === 'object') {
        for (const size of Object.keys(finalManifest.icons)) {
          const p = normalizeFilename(finalManifest.icons[size])
          if (p === rf) delete finalManifest.icons[size]
        }
      } else {
        throw new Error(`Missing referenced asset after fix: ${rf}`)
      }
    }
  }

  // Clean icons object if empty
  if (finalManifest.icons && typeof finalManifest.icons === 'object') {
    const keys = Object.keys(finalManifest.icons)
    if (keys.length === 0) delete finalManifest.icons
  }

  // Persist final manifest back into file
  const finalManifestIndex = fixedFiles.findIndex((f) => normalizeFilename(f.filename) === 'manifest.json')
  fixedFiles[finalManifestIndex] = {
    filename: 'manifest.json',
    content: JSON.stringify(finalManifest, null, 2)
  }

  // Ensure content.js + manifest.json remain
  if (!hasFile(fixedFiles, 'content.js')) throw new Error('Missing required file: content.js')
  if (!hasFile(fixedFiles, 'manifest.json')) throw new Error('Missing required file: manifest.json')
  

  return fixedFiles
}

module.exports = { validateAndFix }

