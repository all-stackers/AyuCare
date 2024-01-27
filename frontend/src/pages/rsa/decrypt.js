import React, { useState } from "react";
import { saveAs } from "file-saver"; // Import file-saver for saving the decrypted PDF file

const DecryptionPage = () => {
  const [encryptedBlob, setEncryptedBlob] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const handleEncryptedBlobChange = (e) => {
    setEncryptedBlob(e.target.value);
  };

  const handlePrivateKeyChange = (e) => {
    setPrivateKey(e.target.value);
  };

  const handleDecrypt = () => {
    if (encryptedBlob && privateKey) {
      import("jsencrypt").then(({ default: JSEncrypt }) => {
        const decrypt = new JSEncrypt();
        decrypt.setPrivateKey(privateKey);
        const decryptedData = decrypt.decrypt(encryptedBlob);
        const decryptedBlob = new Blob([decryptedData], {
          type: "application/pdf",
        });
        console.log(decryptedBlob);
        saveAs(decryptedBlob, "decrypted_file.pdf");

        // // Decrypt chunks separately
        // const chunkSize = 245; // Adjust according to your RSA key size and encryption method
        // const chunks = [];
        // for (let i = 0; i < encryptedBlob.length; i += chunkSize) {
        //   const chunk = encryptedBlob.slice(i, i + chunkSize);
        //   const decryptedChunk = decrypt.decrypt(chunk);
        //   chunks.push(decryptedChunk);
        // }

        // // Combine decrypted chunks into a single Uint8Array
        // const decryptedData = new Uint8Array(
        //   chunks.join("").split(",").map(Number)
        // );

        // // Create a Blob from the decrypted data
        // const decryptedBlob = new Blob([decryptedData], {
        //   type: "application/pdf",
        // });

        // Save the decrypted Blob as a PDF file
        // saveAs(decryptedBlob, "decrypted_file.pdf");
      });
    }
  };

  return (
    <div>
      <h2>PDF Decryption</h2>
      <textarea
        rows="5"
        cols="50"
        placeholder="Enter Encrypted Blob"
        value={encryptedBlob}
        onChange={handleEncryptedBlobChange}
      />
      <br />
      <textarea
        rows="5"
        cols="50"
        placeholder="Enter Private Key"
        value={privateKey}
        onChange={handlePrivateKeyChange}
      />
      <br />
      <button onClick={handleDecrypt}>Decrypt PDF</button>
    </div>
  );
};

export default DecryptionPage;
