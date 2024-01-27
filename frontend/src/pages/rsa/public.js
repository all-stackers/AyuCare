"use client";
import React, { useState } from "react";

const PublicKeyGenerator = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const handleGeneratePublicKey = () => {
    if (privateKey) {
      import("jsencrypt")
        .then(({ default: JSEncrypt }) => {
          try {
            const encrypt = new JSEncrypt();
            encrypt.setPrivateKey(privateKey);
            const generatedPublicKey = encrypt.getPublicKey();
            setPublicKey(generatedPublicKey);
          } catch (error) {
            console.error("Error generating public key:", error);
          }
        })
        .catch((error) => {
          console.error("Failed to load JSEncrypt:", error);
        });
    } else {
      console.error("Private key is null or empty.");
    }
  };

  const generatePrivateKey = async () => {
    try {
      // Generate RSA key pair
      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: 2048,
          publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 65537
          hash: "SHA-256",
        },
        true, // extractable
        ["encrypt", "decrypt"] // key usages
      );

      // Export private key in PEM format
      const exportedPrivateKey = await window.crypto.subtle.exportKey(
        "pkcs8",
        keyPair.privateKey
      );

      // Convert exported private key to PEM format
      const pemPrivateKey = `
  -----BEGIN RSA PRIVATE KEY-----
  ${btoa(String.fromCharCode(...new Uint8Array(exportedPrivateKey)))}
  -----END RSA PRIVATE KEY-----
  `;

      setPrivateKey(pemPrivateKey);
    } catch (error) {
      console.error("Error generating private key:", error);
    }
  };

  return (
    <div>
      <h2>Public Key Generation</h2>
      <textarea
        rows="5"
        cols="50"
        placeholder="Enter Private Key"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
      />
      <button onClick={() => generatePrivateKey()}>Generate Private Key</button>
      <br />
      <button onClick={handleGeneratePublicKey}>Generate Public Key</button>
      <br />
      <textarea
        rows="5"
        cols="50"
        placeholder="Public Key"
        value={publicKey}
        readOnly
      />
    </div>
  );
};

export default PublicKeyGenerator;
