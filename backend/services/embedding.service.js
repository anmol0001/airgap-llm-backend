const axios = require('axios');
const { config } = require('../config/index');

const embedText = async(text) => {
  const response = await axios.post(
    `${config.LLM_BASE_URL}/api/embeddings`,
    {
      model: config.LLM_MODEL,
      prompt: text,
    },
    { timeout: 0 }
  );

  return response.data.embedding;
}

module.exports = {embedText}