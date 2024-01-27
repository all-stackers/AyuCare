import React, { useState } from "react";
import forge from "node-forge"; // For RSA encryption/decryption
import pdfjsLib from "pdfjs-dist/build/pdf"; // For PDF processing

// Sample RSA key size
const RSA_KEY_SIZE = 2048;

function PdfEncryption() {
  const [encryptedPdf, setEncryptedPdf] = useState(null);
  const [decryptedPdf, setDecryptedPdf] = useState(null);

  // Generate RSA key pair
  const rsaKeyPair = forge.pki.rsa.generateKeyPair({ bits: RSA_KEY_SIZE });

  // Function to encrypt PDF file
  const encryptPdf = async (file) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const pdfData = new Uint8Array(event.target.result);
      const chunkSize = 245; // Adjust chunk size according to RSA key size
      let encryptedChunks = [];

      for (let i = 0; i < pdfData.length; i += chunkSize) {
        const chunk = pdfData.subarray(i, i + chunkSize);
        const encryptedChunk = rsaKeyPair.publicKey.encrypt(chunk);
        encryptedChunks.push(encryptedChunk);
      }

      setEncryptedPdf(encryptedChunks);
    };
    reader.readAsArrayBuffer(file);
  };

  // Function to decrypt PDF file
  const decryptPdf = () => {
    // Decrypt encrypted PDF data using RSA private key
    const decryptedData = rsaKeyPair.privateKey.decrypt(encryptedPdf);
    setDecryptedPdf(decryptedData);
    console.log(decryptedData);
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      encryptPdf(file);
    }
  };

  return (
    <div>
      <h1>PDF Encryption/Decryption</h1>
      <input type="file" onChange={handleFileUpload} />
      {encryptedPdf && (
        <div>
          <h2>Encrypted PDF</h2>
          {/* Display or download encrypted PDF */}
          <button onClick={decryptPdf}>Decrypt PDF</button>
        </div>
      )}
      {decryptedPdf && (
        <div>
          <h2>Decrypted PDF</h2>
          {/* Display or download decrypted PDF */}
        </div>
      )}
    </div>
  );
}

export default PdfEncryption;
