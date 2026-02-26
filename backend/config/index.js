require('dotenv').config();

let config = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8443,
  LLM_BASE_URL: process.env.LLM_BASE_URL || 'http://ollama:11434',
  LLM_MODEL: process.env.LLM_MODEL || 'mistral-offline',
  TLS_KEY_PATH: '/certs/key.pem',
  TLS_CERT_PATH: '/certs/cert.pem',
  STORAGE_PATH: process.env.STORAGE_PATH || 'storage/embeddings.json',
  API_KEY_ADMIN: process.env.API_KEY_ADMIN,
  API_KEY_READONLY: process.env.API_KEY_READONLY,
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads/',
  JSON_BODY_LIMIT: process.env.JSON_BODY_LIMIT || '10kb',
  FILE_UPLOAD_LIMIT_MB: Number(process.env.FILE_UPLOAD_LIMIT_MB || 3) * 1024 * 1024,
  RATE_LIMIT_WINDOW_MIN: Number(process.env.RATE_LIMIT_WINDOW_MIN || 1) * 60 * 1000,
  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX || 1)
};


module.exports = {config}