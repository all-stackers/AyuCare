import React, { useState } from "react";
import CryptoJS from "crypto-js";

const FileEncryptionPage = () => {
  const [file, setFile] = useState(null);
  const [secretKey, setSecretKey] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const encryptFile = () => {
    if (file && secretKey) {
      console.log("here");
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = event.target.result;
        const encryptedData = CryptoJS.AES.encrypt(
          fileData,
          secretKey
        ).toString();
        console.log("Encrypted Blob:", encryptedData); // Log encrypted blob

        console.log("Done");
      };
      reader.readAsDataURL(file);

      console.log("here2");
    }
  };

  return (
    <div>
      <h2>File Encryption</h2>
      <input type="file" onChange={handleFileChange} />
      <br />
      <input
        type="text"
        placeholder="Enter Secret Key"
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
      />
      <br />
      <button onClick={encryptFile}>Encrypt File</button>
    </div>
  );
};

export default FileEncryptionPage;
