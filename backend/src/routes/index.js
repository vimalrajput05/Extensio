const express = require('express');

const { health } = require('../controllers/healthController');

const router = express.Router();

// Base API routes
router.get('/health', health);

// Stub endpoints for future frontend integrations
router.get('/generate', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Generate endpoint stub (mock response)',
  });
});

router.post('/auth', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Auth endpoint stub (mock response)',
    body: req.body,
  });
});

router.get('/analytics', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Analytics endpoint stub (mock response)',
  });
});

module.exports = router;

