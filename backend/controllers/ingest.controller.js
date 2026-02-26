const { ingestService } = require('../services/ingest.service');

const ingestController = async(req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File is required' });
    }

    const chunkCount = await ingestService.ingestFile(req.file);

    res.json({
      message: 'Document ingested successfully',
      chunks: chunkCount
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {ingestController}