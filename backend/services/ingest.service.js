const fs = require('fs');
const pdf = require('pdf-parse');
const { embedText } = require('./embedding.service.js');
const { config } = require('../config/index.js');

const CHUNK_SIZE = 800;

async function extractText(file) {
  const { mimetype, path, originalname } = file;
  const ext = originalname.split(".").pop().toLowerCase();

  // TXT / MD
  if (mimetype.startsWith("text/") && (ext === "txt" || ext === "md")){
    return fs.readFileSync(path, "utf8");
  }

  // PDF
  if (mimetype === "application/pdf" || ext === "pdf") {
    const dataBuffer = fs.readFileSync(path);
    // 3️⃣ Disable rendering (no canvas)
    const pdfData = await pdf(dataBuffer);
    return pdfData.text;
  }

  throw new Error("Unsupported file type");
}

const ingestService = {
  async ingestFile(file) {
    const rawText = await extractText(file);

    const text = rawText
      ?.replace(/\u0000/g, "")
      ?.replace(/\s+/g, " ")
      ?.trim();

    if (!text || text.length < 20) {
      throw new Error( "No extractable text found" );
    }

    const chunks = [];

    for (let i = 0; i < text.length; i += CHUNK_SIZE) {
      chunks.push(text.slice(i, i + CHUNK_SIZE));
    }

    const embedded = [];

    for (const chunk of chunks) {
      const embedding = await embedText(chunk);
      embedded.push({ text: chunk, embedding });
    }

    fs.writeFileSync(
      config.STORAGE_PATH,
      JSON.stringify(embedded, null, 2)
    );

    return embedded.length;
  }
};


module.exports = {ingestService}