import React, { useState } from 'react';
import { ScaleLoader } from 'react-spinners';


const PdfUploader = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      setPdfFiles((prevFiles) => [...prevFiles, selectedFile]);
      setSelectedFile(null);
    }
  };

  const openPdfInNewTab = (fileName) => {
    const fileUrl = window.URL.createObjectURL(new Blob([fileName]));
    window.open(fileUrl);
  };

  return (
    <div className="flex items-center  h-screen">
      <div className="w-1/2 mr-4 h-[100%] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Upload PDF</h2>
        <div className='w-[50%] h-[80%] pt-[10px]'>
          <div className="flex flex-row w-[100%] mx-auto gap-x-16 justify-center items-center h-[100%]">
            <div className="flex flex-col items-center">

              
                <div className="p-8 border-[3px] border-dotted border-gray-300 rounded-lg bg-gray-100 text-center flex flex-col justify-center items-center ">
                  <h2 className="text-xl font-semibold ">pdf Upload</h2>
                  <label className="flex flex-col justify-center items-center mt-4 ">
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
                      <p className="text-gray-500 mt-2">
                        Choose a file or drag it here
                      </p>
                      <input
                        className=" hidden"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                    </div>
                  </label>
                </div>
              
              {/* <p>{image?.name}</p> */}
              {loading ? (
                <div className="mt-4">
                  <ScaleLoader color="#2563eb" />
                  Hold on!
                </div>
              ) : (
                <button
                  className="my-2 py-2 px-6 bg-blue-600 text-white rounded-full"
                  onClick={handleUpload}
                >
                  Upload Image
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
      <hr className="border-l border-gray-300 h-[100%] my-4 mx-2" />
      <div className="w-1/2 ml-4 flex flex-col items-center h-[100%] px-10 py-14">
        <h2 className="text-2xl font-bold mb-4">Uploaded PDFs</h2>
        <ul>
          {pdfFiles.map((file, index) => (
            <li key={index} className="mb-2">
              <span
                className="text-blue-500 underline cursor-pointer"
                onClick={() => openPdfInNewTab(file)}
              >
                {file.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PdfUploader;
