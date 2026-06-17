const router = require('express').Router()
const extensionController = require('../controllers/extensionController')
const { verifyToken, optionalAuth } = require('../middleware/authMiddleware')

router.post('/generate', optionalAuth, extensionController.generateExtension)
router.get('/download/:extensionId', extensionController.downloadExtension)
router.get('/my', verifyToken, extensionController.getMyExtensions)
router.delete('/:id', verifyToken, extensionController.deleteExtension)

module.exports = router




