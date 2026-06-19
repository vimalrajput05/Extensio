const { generateExtension: aiGenerate } = require('../services/aiService')
const { createZip } = require('../services/zipService')
const { validateAndFix } = require('../services/validateAndFixExtension')
const Extension = require('../models/Extension')
const User = require('../models/User')
const { FREE_PLAN_LIMIT } = require('../config/env')
const { optionalAuth } = require('../middleware/authMiddleware')



exports.generateExtension = async (req, res) => {

  try {
    const { prompt } = req.body


    if (!prompt || prompt.trim().length < 10) {
      return res
        .status(400)
        .json({ success: false, error: 'Prompt too short (min 10 chars)' })
    }

    if (prompt.trim().length > 500) {
      return res
        .status(400)
        .json({ success: false, error: 'Prompt too long (max 500 chars)' })
    }

    let userId = req.userId || null
    if (userId) {
      const user = await User.findById(userId)
      if (user && user.plan === 'free') {
        const count = await Extension.countDocuments({ userId })
        if (count >= FREE_PLAN_LIMIT) {
          return res.status(403).json({
            success: false,
            error: 'Free plan limit reached. Upgrade to Pro.'
          })
        }
      }
    }

    const aiResult = await aiGenerate(prompt)

    // Pre-zip validation & auto-fix: ensure manifest referenced assets (icons/popup) exist.
    // This prevents Chrome "Could not load icon" / "Could not load manifest" errors.
    const fixedFiles = validateAndFix(aiResult.files)

    const extension = await Extension.create({
      userId: userId,
      prompt: prompt.trim(),
      title: aiResult.title,
      files: fixedFiles,
      status: 'generated'
    })



    return res.json({
      success: true,
      extensionId: extension._id,
      title: extension.title,
      files: extension.files,
      downloadUrl: '/api/extensions/download/' + extension._id
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

    if (!extension) {
      return res.status(404).json({ success: false, error: 'Extension not found' })
    }

    const zipPath = await createZip(extension.files, extension._id.toString())

    const safeName =
      extension.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') + '.zip'

    res.download(zipPath, safeName, (err) => {
      if (err) console.error('Download error:', err.message)

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

exports.getMyExtensions = async (req, res) => {
  try {
    const extensions = await Extension.find({ userId: req.userId }).sort({ createdAt: -1 })
    return res.json({ success: true, extensions })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
}

exports.deleteExtension = async (req, res) => {
  try {
    const { id } = req.params
    const extension = await Extension.findOne({
      _id: id,
      userId: req.userId
    })
    if (!extension)
      return res.status(403).json({
        success: false,
        error: 'Not authorized or not found'
      })
    await Extension.deleteOne({ _id: id })
    return res.json({ success: true, message: 'Extension deleted' })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
}




