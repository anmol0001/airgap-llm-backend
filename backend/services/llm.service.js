const axios = require('axios');
const { config } = require('../config/index.js');

const generate = async(prompt) => {
  const res = await axios.post(
    `${config.LLM_BASE_URL}/api/generate`,
    {
      model: config.LLM_MODEL,
      prompt,
      stream: false,
    },
    { timeout: 0 }
  );

  return res.data.response;
}

module.exports = {generate}