function notFound(req, res) {
  res.status(404).json({ error: 'Not Found' });
}

function errorHandler(err, req, res, next) {
  // eslint-disable-line no-unused-vars
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = { notFound, errorHandler };

