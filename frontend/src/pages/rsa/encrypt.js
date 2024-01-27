"use client";

import React, { useState } from "react";

const EncryptionPage = () => {
  const [file, setFile] = useState(null);
  const [publicKey, setPublicKey] = useState("");
  const [encryptedBlob, setEncryptedBlob] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePublicKeyChange = (e) => {
    setPublicKey(e.target.value);
  };

  const handleEncrypt = () => {
    if (file && publicKey) {
      import("jsencrypt").then(({ default: JSEncrypt }) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const fileData = event.target.result;
          const encrypt = new JSEncrypt();
          encrypt.setPublicKey(publicKey);

          // Chunk size (in bytes)
          const chunkSize = 245; // Adjust according to your RSA key size
          const totalChunks = Math.ceil(fileData.length / chunkSize);
          let encryptedChunks = [];

          for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = (i + 1) * chunkSize;
            const chunk = fileData.slice(start, end);
            const encryptedChunk = encrypt.encrypt(chunk);
            encryptedChunks.push(encryptedChunk);
          }

          const encryptedData = encryptedChunks.join("");
          setEncryptedBlob(encryptedData);
        };

        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div>
      <h2>File Encryption</h2>
      <input type="file" onChange={handleFileChange} />
      <br />
      <textarea
        rows="5"
        cols="50"
        placeholder="Enter Public Key"
        value={publicKey}
        onChange={handlePublicKeyChange}
      />
      <br />
      <button onClick={handleEncrypt}>Encrypt File</button>
      <br />
      {encryptedBlob && (
        <div>
          <h3>Encrypted Blob</h3>
          <textarea rows="5" cols="50" value={encryptedBlob} readOnly />
        </div>
      )}
    </div>
  );
};

export default EncryptionPage;
