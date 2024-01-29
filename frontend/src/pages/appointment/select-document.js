import { forEach } from "lodash";
import React, { useState, useEffect } from "react";
import MiniScaleLoader from "react-spinners/ScaleLoader";



const SelectDocument = () => {
  const [selectedPdfs, setSelectedPdfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfs, setPdfs] = useState([]);
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch("http://localhost:5000/documents");
        const data = await response.json();
        setPdfs(data.documents);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    fetchDocuments();

  }, []);
  const handlePdfSelect = (pdfId) => {
    const selected = pdfs.find((pdf) => pdf.id === pdfId);
    setSelectedPdfs((prevSelected) => [...prevSelected, selected]);
  };

  const handleClick = () => {
    setLoading(true);
    let sharePdfs = [];
    forEach(selectedPdfs, async (pdf) => {
      sharePdfs.push(pdf.id)
    });
    console.log(sharePdfs);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "documents": sharePdfs
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/share", requestOptions)
      .then(response => response.text())
      .then(result => { console.log(result); setLoading(false); })
      .catch(error => console.log('error', error));
  };

  console.log(selectedPdfs);

  return (
    <div>
      <div className="flex max-w-[850px] mx-auto mt-[50px] min-h-[100px] transition duration-300 border border-gray-300 rounded-lg shadow-md">
        <div className="w-[50%] h-full p-[30px] border-r-[1px] border-gray-300">
          <h1 className="text-3xl font-bold mb-[10px]">Selected PDFs</h1>
          <p className="text-gray-600 mb-[40px]">
            These PDFs will be shared with your doctor
          </p>
          <div className="grid grid-cols-1 gap-2">
            {selectedPdfs.map((pdf) => (
              <div
                key={pdf.id}
                className="flex items-center gap-x-[10px] bg-white p-2 border rounded"
              >
                <img
                  className="h-[40px]"
                  src="\assets\pdf-file-format.png"
                  alt="PDF Icon"
                ></img>
                <p className="text-gray-700">{pdf.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[50%] py-[30px] px-[30px] bg-gray-100">
          <h1 className="text-xl mb-[20px] font-bold">
            Select documents you want to share
          </h1>
          <div className="grid grid-cols-1 gap-4">

            <>
              {pdfs.map((pdf) => (
                <div
                  key={pdf.id}
                  className="bg-white w-[100%] mx-auto shadow-md overflow-hidden"
                >
                  <div className="flex items-center justify-between px-[20px] py-[10px]">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <img
                          className="h-[40px]"
                          src="\assets\pdf-file-format.png"
                          alt="PDF Icon"
                        ></img>
                      </div>
                      <div>
                        <h2 className="font-bold text-gray-700 text-[16px]">
                          {pdf.name}
                        </h2>
                        <div className="flex gap-x-[15px]">
                          <p className="text-gray-600 text-[12px]">
                            Upload Date: {pdf.uploadDate}
                          </p>
                          <p className="text-gray-600 text-[12px]">
                            Size: {pdf.size}
                          </p>
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      onChange={() => handlePdfSelect(pdf.id)}
                    />
                  </div>
                </div>
              ))}
            </>

          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={handleClick}
          className="px-[40px] my-[20px] border bg-blue-500 text-xl text-white border-gray-500 h-[40px] rounded-full"
        >
          {loading ? <MiniScaleLoader color="#fff" /> : <span>Submit</span>}
        </button>
      </div>
    </div>
  );
};

export default SelectDocument;
