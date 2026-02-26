const { config } = require('../config/index')

const ROLE_BY_KEY = {
  [config.API_KEY_ADMIN]: 'admin',
  [config.API_KEY_READONLY]: 'readonly'
};

function authenticate(req, res, next) {
  const apiKey = req.header('X-API-Key');

  if (!apiKey) {
    return res.status(401).json({ error: 'API key missing' });
  }

  const role = ROLE_BY_KEY[apiKey];
  if (!role) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  req.user = { role };
  next();
}

module.exports = { authenticate };
