import React, { useState, useRef, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import CryptoJS from "crypto-js";

const UploadModal = ({ isOpen, closeModal }) => {
  const [fileName, setFileName] = useState("Choose a file or drag it here");
  const modalRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [fileObject, setFileObject] = useState(null);

  const handleBlurBackgroundClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const encryptFile = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = event.target.result;
        const encryptedData = CryptoJS.AES.encrypt(
          fileData,
          "IyaLRhwGUhXWdFQH048lfI0cHwsozuYacZweqDXcUaFsQw8Y"
        ).toString();
        console.log("Encrypted Blob:", encryptedData);

        const currentDate = new Date().toLocaleDateString();
        const fileSize = (selectedFile.size / (1024 * 1024)).toFixed(2) + " MB";

        const encryptedFileObject = {
          filename: selectedFile.name,
          encrypted_blob: encryptedData,
          upload_date: currentDate,
          size: fileSize,
        };
        console.log(encryptedFileObject);
        setFileObject(encryptedFileObject);
        setShowLoader(false);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFileName(e.target.value.length ? e.target.value : "file seleted");
  };

  const handleSubmit = () => {
    setShowLoader(true);
    encryptFile();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleBlurBackgroundClick);
    } else {
      document.removeEventListener("mousedown", handleBlurBackgroundClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleBlurBackgroundClick);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div
            className="modal-overlay bg-transparent fixed top-0 left-0 w-full h-full"
            onClick={closeModal}
          ></div>
          <div className="modal-content bg-white p-12 rounded shadow-lg relative z-10 w-[40%]">
            <span
              className="close-button text-2xl cursor-pointer absolute top-2 right-2"
              onClick={closeModal}
            >
              &times;
            </span>
            <h2 className="text-xl font-semibold mb-4">PDF Upload</h2>
            <label className="flex flex-col justify-center items-center">
              <div className="cursor-pointer border-2 border-dotted h-[100%] w-[100%] border-gray-400 px-4 rounded-lg bg-white py-[30px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-500"
                  height="24"
                  fill="gray"
                  viewBox="0 -960 960 960"
                  stroke="currentColor"
                >
                  <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
                </svg>
                <p className="text-center text-gray-500 mt-2">{fileName}</p>
                <input
                  className="hidden"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </div>
            </label>
            <div className="flex justify-center w-[100%]">
              {showLoader ? (
                <div className="flex flex-col gap-y-[10px] mt-[20px] items-center">
                  <ScaleLoader color="#7C3AED" />
                  Encrypting...
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-[40px] py-2 rounded-lg mt-4 hover:bg-blue-600"
                >
                  Upload
                </button>
              )}
            </div>
          </div>
          <div className="blur-background fixed top-0 left-0 w-full h-full backdrop-filter backdrop-blur-sm"></div>
        </div>
      )}
    </>
  );
};

export default UploadModal;
