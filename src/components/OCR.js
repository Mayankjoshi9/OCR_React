// src/components/OCR.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const OCR = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrResult, setOcrResult] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleOcr = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setOcrResult(response.data.text);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="ocr-container">
      <h2>OCR React App</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleOcr}>Get Text</button>
      <div className="result">
        <h3>Result:</h3>
        <p>{ocrResult}</p>
      </div>
    </div>
  );
};

export default OCR;
