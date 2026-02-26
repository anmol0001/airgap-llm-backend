const multer = require('multer');
const { logger } = require('../utils/logger.js');

const errorHandler = (err, req, res, next) => {
  // Log with request correlation
  logger.error(`[${req.id}] ${err.message}`);

  // ✅ Multer-specific errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File size limit exceeded',
      });
    }

    return res.status(400).json({
      error: err.message,
    });
  }

  // ✅ Custom upload validation errors
  if (err.message === 'Unsupported file type') {
    return res.status(400).json({
      error: err.message,
    });
  }

  // ❌ Fallback (unexpected errors)
  return res.status(500).json({
    error: 'Internal Server Error',
  });
};

module.exports = {errorHandler}