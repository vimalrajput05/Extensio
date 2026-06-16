const router = require('express').Router()

const extensionController = require('../controllers/extensionController')

router.post('/generate', extensionController.generateExtension)
router.get('/download/:extensionId', extensionController.downloadExtension)

module.exports = router


