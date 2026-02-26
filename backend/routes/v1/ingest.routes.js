const { Router } = require('express');
const { ingestController } = require('../../controllers/ingest.controller.js');
const { upload } = require('../../middlewares/upload.middleware.js')
const { authenticate } = require('../../middlewares/auth.middleware.js');
const { authorize } = require('../../middlewares/authorize.middleware.js');
const { rateLimit } = require('../../middlewares/rate-limit.middleware.js')

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(['admin']), // 🔒 ingest is admin-only
  rateLimit({ windowMs: 60000, max: 5 }), // 5 uploads / min
  upload.single('file'),
  ingestController
);

module.exports = router;
