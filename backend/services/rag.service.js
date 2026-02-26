const fs = require('fs');
const { config } = require('../config/index.js');
const { embedText } = require('./embedding.service.js');
const { generate } = require('./llm.service.js');

function safeReadJson(path, fallback = []) {
  try {
    if (!fs.existsSync(path)) {
      return fallback;
    }

    const raw = fs.readFileSync(path, 'utf8');

    if (!raw.trim()) {
      return fallback;
    }

    return JSON.parse(raw);
  } catch (err) {
    console.error(`Invalid JSON at ${path}:`, err.message);
    return fallback;
  }
}

function cosineSimilarity(a, b) {
  const dot = a.reduce((s, x, i) => s + x * b[i], 0);
  const normA = Math.sqrt(a.reduce((s, x) => s + x * x, 0));
  const normB = Math.sqrt(b.reduce((s, x) => s + x * x, 0));
  return dot / (normA * normB);
}

const ragService = {
  async chat(prompt) {
    const queryEmbedding = await embedText(prompt);
    const stored = safeReadJson(config.STORAGE_PATH, []);

    if (!stored.length) {
      return generate("I don't know.");
    }

    const context = stored
      .map(d => ({
        text: d.text,
        score: cosineSimilarity(queryEmbedding, d.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(d => d.text)
      .join('\n---\n');

    const finalPrompt = `Answer ONLY using the context below.
                        If the answer is not present, say "I don't know".

                        Context:
                        ${context}

                        Question:
                        ${prompt}`;

    return generate(finalPrompt);
  },
};

module.exports = {ragService}