import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const FileDecryptionPage = () => {
  const [encryptedData, setEncryptedData] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [decryptedData, setDecryptedData] = useState('');

  const handleDecrypt = () => {
    if (encryptedData && secretKey) {
      const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
      setDecryptedData(decryptedData);
    }
  };

  return (
    <div>
      <h2>File Decryption</h2>
      <textarea
        rows="5"
        cols="50"
        placeholder="Enter Encrypted Blob"
        value={encryptedData}
        onChange={(e) => setEncryptedData(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter Secret Key"
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
      />
      <br />
      <button onClick={handleDecrypt}>Decrypt</button>
      <br />
      {decryptedData && (
        <div>
          <h3>Decrypted File</h3>
          <a href={decryptedData} download="decrypted_file">Download Decrypted File</a>
        </div>
      )}
    </div>
  );
};

export default FileDecryptionPage;
