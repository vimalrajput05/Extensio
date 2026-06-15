const router = require('express').Router()

const extensionController = require('../controllers/extensionController')

router.post('/generate', extensionController.generateExtension)

module.exports = router

