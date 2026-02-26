const fs = require('fs');
const http = require('http');
const https = require('https');
const app = require('./app.js');
const { config } = require('./config/index.js')
const { logger } = require('./utils/logger.js');

const keyPath = config.TLS_KEY_PATH;
const certPath = config.TLS_CERT_PATH;

const hasSSLCerts =
  fs.existsSync(keyPath) &&
  fs.existsSync(certPath);

let server;

if (hasSSLCerts) {
  const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  };

  server = https.createServer(options, app).listen(config.PORT, () => {
    logger.info(`🔐 HTTPS Backend running on port ${config.PORT}`);
  });
} else {
  server = http.createServer(app).listen(config.PORT, () => {
    logger.info(`⚠️ SSL not found, running HTTP Backend running on port${config.PORT}`);
  });
}

// Graceful shutdown
function shutdown(signal) {
  logger.info(`Received ${signal}. Shutting down gracefully...`);

  server.close(() => {
    logger.info('HTTPS/HTTP server closed');
    process.exit(0);
  });

  // Force exit after timeout
  setTimeout(() => {
    logger.error('Force exiting process');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);