const { ragService } = require('../services/rag.service');

const chatController = async(req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt required' });
    }

    const answer = await ragService.chat(prompt);
    res.json({ answer });
  } catch (err) {
    next(err);
  }
}

module.exports = {chatController}