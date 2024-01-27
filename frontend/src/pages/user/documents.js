import React, { useState } from "react";
import UploadModal from "@/components/upload";

const PdfList = () => {
  // Sample PDF data (you can replace this with your actual data)
  const pdfs = [
    {
      id: 1,
      name: "Sample PDF 1",
      url: "sample_pdf_1.pdf",
      uploadDate: "2024-01-27",
      size: "1.5 MB",
    },
    {
      id: 2,
      name: "Sample PDF 2",
      url: "sample_pdf_2.pdf",
      uploadDate: "2024-01-26",
      size: "2.3 MB",
    },
    {
      id: 3,
      name: "Sample PDF 3",
      url: "sample_pdf_3.pdf",
      uploadDate: "2024-01-25",
      size: "1.8 MB",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    console.log("reached");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // setRandomText('');
  };
  // Function to handle upload PDF button click
  const handleUploadPdfClick = () => {
    // Handle upload PDF functionality
    // This can be implemented based on your application logic
    console.log("Upload PDF button clicked");
    openModal();
  };

  return (
    <div className="flex">
      <div className="px-8 py-8 w-[50%]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Your Uploads</h1>
          <button className="text-gray-400" onClick={handleUploadPdfClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {pdfs.map((pdf) => (
            <div key={pdf.id} className="bg-white shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <img
                        className="h-12"
                        src="\assets\pdf-file-format.png"
                        alt="PDF Icon"
                      ></img>
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-700 text-lg">
                        {pdf.name}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Upload Date: {pdf.uploadDate}
                      </p>
                      <p className="text-gray-600 text-sm">Size: {pdf.size}</p>
                    </div>
                  </div>
                  <a
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline"
                  >
                    View PDF
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100 px-8 py-8 w-[50%]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-[18px]">Shared with Doctors</h1>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {pdfs.map((pdf) => (
            <div key={pdf.id} className="bg-white shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <img
                        className="h-12"
                        src="\assets\pdf-file-format.png"
                        alt="PDF Icon"
                      ></img>
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-700 text-lg">
                        {pdf.name}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Upload Date: {pdf.uploadDate}
                      </p>
                      <p className="text-gray-600 text-sm">Size: {pdf.size}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      className="mb-[5px] w-[40px] h-[40px] rounded-[50%] border-2"
                      src="/assets/doctor.jpg"
                    />
                    <p className="font-semibold text-gray-700">Dr. Mary Grey</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <UploadModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default PdfList;
