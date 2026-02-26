const express = require('express');
const apiRoutes = require('./routes/index.js');
const { errorHandler } = require('./middlewares/error.middleware.js');
const { requestId } = require('./middlewares/request-id.middleware.js');
const { securityHeaders } = require('./middlewares/security-headers.middleware.js')
const { config } = require('./config/index.js')
const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: config.JSON_BODY_LIMIT }));
app.use(securityHeaders);
app.use(requestId);

app.use('/api', apiRoutes);

app.use(errorHandler);

module.exports = app;
