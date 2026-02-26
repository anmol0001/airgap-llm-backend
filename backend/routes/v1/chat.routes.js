const { Router } = require('express');
const { chatController } = require('../../controllers/chat.controller');
const { authenticate } = require('../../middlewares/auth.middleware.js');
const { authorize } = require('../../middlewares/authorize.middleware.js');
const { rateLimit } = require('../../middlewares/rate-limit.middleware.js')

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(['admin', 'readonly']),
  rateLimit({ windowMs: 60000, max: 8 }), 
  chatController
);

module.exports = router;
