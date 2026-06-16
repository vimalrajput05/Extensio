const archiver = require('archiver')
const fs = require('fs')
const path = require('path')

exports.createZip = function (files, extensionId) {
  return new Promise((resolve, reject) => {
    const tmpDir = path.join('/tmp', 'extensio-' + extensionId)
    const zipPath = path.join('/tmp', 'extensio-' + extensionId + '.zip')

    try {
      fs.mkdirSync(tmpDir, { recursive: true })

      for (const file of files) {
        const filePath = path.join(tmpDir, file.filename)
        fs.writeFileSync(filePath, file.content)
      }

      const archive = archiver('zip', { zlib: { level: 9 } })
      const output = fs.createWriteStream(zipPath)

      output.on('close', () => resolve(zipPath))
      output.on('error', (err) => reject(err))
      archive.on('error', (err) => reject(err))

      archive.directory(tmpDir, false)
      archive.pipe(output)
      archive.finalize()
    } catch (err) {
      reject(err)
    }
  })
}

