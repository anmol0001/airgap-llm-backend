const { Router } = require('express');

const chatV1Routes = require('./v1/chat.routes.js');
const ingestV1Routes = require('./v1/ingest.routes.js');
const healthRoutes = require('./health.routes');

const router = Router();

// v1 APIs
router.use('/health', healthRoutes);
router.use('/v1/chat', chatV1Routes);
router.use('/v1/ingest', ingestV1Routes);

module.exports = router;
