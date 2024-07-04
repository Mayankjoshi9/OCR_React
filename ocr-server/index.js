// ocr-server/index.js
const express = require('express');
const multer = require('multer');
const tesseract = require('node-tesseract-ocr');
const cors = require('cors');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  const config = {
    lang: 'eng',
    oem: 1,
    psm: 3,
  };

  tesseract
    .recognize(filePath, config)
    .then((text) => {
      fs.unlinkSync(filePath); // Delete the file after processing
      res.json({ text });
    })
    .catch((error) => {
      fs.unlinkSync(filePath);
      res.status(500).json({ error: error.message });
    });
});

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
