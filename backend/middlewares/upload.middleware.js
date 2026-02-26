const fs = require('fs');
const multer = require('multer');
const { config } = require('../config/index')

// Ensure upload directory exists
if (!fs.existsSync(config.UPLOAD_DIR)) {
  fs.mkdirSync(config.UPLOAD_DIR, { recursive: true });
}

const upload = multer({
  dest: config.UPLOAD_DIR,
  limits: {
    fileSize: config.FILE_UPLOAD_LIMIT_MB
  },
  fileFilter(req, file, cb) {
    const allowedTypes = [
      'application/pdf',
      'text/plain',
      'text/markdown'
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Unsupported file type'));
    }

    cb(null, true);
  },
});

module.exports = {upload}