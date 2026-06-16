const { generateExtension: aiGenerate } = require('../services/aiService')
const { createZip } = require('../services/zipService')
const Extension = require('../models/Extension')

exports.generateExtension = async (req, res) => {
  try {
    const { prompt } = req.body

    if (!prompt || prompt.trim().length < 10)
      return res
        .status(400)
        .json({ success: false, error: 'Prompt too short (min 10 chars)' })

    if (prompt.trim().length > 500)
      return res
        .status(400)
        .json({ success: false, error: 'Prompt too long (max 500 chars)' })

    const aiResult = await aiGenerate(prompt)

    const extension = await Extension.create({
      prompt: prompt.trim(),
      title: aiResult.title,
      files: aiResult.files,
      status: 'generated',
    })

    return res.json({
      success: true,
      extensionId: extension._id,
      title: extension.title,
      files: extension.files,
      downloadUrl: '/api/extensions/download/' + extension._id,
    })
  } catch (err) {
    console.error('Generate error:', err.message)
    return res.status(500).json({ success: false, error: err.message })
  }
}

exports.downloadExtension = async (req, res) => {
  try {
    const { extensionId } = req.params
    const extension = await Extension.findById(extensionId)

    if (!extension)
      return res
        .status(404)
        .json({ success: false, error: 'Extension not found' })

    const zipPath = await createZip(extension.files, extension._id.toString())

    const safeName =
      extension.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') + '.zip'

    res.download(zipPath, safeName, (err) => {
      if (err) console.error('Download error:', err.message)

      // cleanup tmp files
      const fs = require('fs')
      const path = require('path')
      const tmpDir = path.join('/tmp', 'extensio-' + extension._id.toString())

      try {
        fs.rmSync(tmpDir, { recursive: true, force: true })
      } catch (e) {}

      try {
        fs.unlinkSync(zipPath)
      } catch (e) {}
    })
  } catch (err) {
    console.error('Download error:', err.message)
    return res.status(500).json({ success: false, error: err.message })
  }
}


