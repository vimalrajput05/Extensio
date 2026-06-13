const express = require('express');

const { health } = require('./controllers/healthController');
const apiRoutes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Legacy health route (kept for compatibility)
app.get('/health', health);

// API routes
app.use('/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

