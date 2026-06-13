const { getHealth } = require('../services/healthService');

function health(req, res) {
  res.status(200).json(getHealth());
}

module.exports = { health };

