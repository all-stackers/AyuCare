import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

const DocumentModal = ({ isOpen, closeModal }) => {
    const router = useRouter();

    const [sharedDocs, setSharedDocs] = useState([]);
    const [downloadUrl, setDownloadUrl] = useState("")
    const modalRef = useRef(null);

    const handleBlurBackgroundClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    };
    const fetchSharedDocuments = async () => {
        try {
            const response = await fetch("http://localhost:5000/share");
            const data = await response.json();
            // remove the first element from the array
            data.data.shift();
            setSharedDocs(data.data);

        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };
    const handleDownload = () => {
        const decryptedBlob = new Blob(["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"], { type: 'application/pdf' }); // Assuming decrypted data is PDF
      const url = URL.createObjectURL(decryptedBlob);
      setDownloadUrl(url);

    };    


    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleBlurBackgroundClick);
        } else {
            document.removeEventListener('mousedown', handleBlurBackgroundClick);
        }

        return () => {

            fetchSharedDocuments();
            document.removeEventListener('mousedown', handleBlurBackgroundClick);
        };
    }, [isOpen]);

    useEffect(() => {
        handleDownload()
    }, [])

    return (

        <>

            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="modal-overlay bg-transparent fixed top-0 left-0 w-full h-full" onClick={closeModal}></div>
                    <div className="modal-content bg-white p-12 rounded shadow-lg relative z-10 w-[40%]">

                        {sharedDocs.map((pdf, index) => (
                            <div key={pdf.id} className="bg-white shadow-md mb-[10px] overflow-hidden">
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
                                                    Upload Date: {pdf.upload_date}
                                                </p>
                                                <p className="text-gray-600 text-sm">Size: {pdf.size}</p>
                                            </div>
                                        </div>
                                        <a
                                            href={downloadUrl} download={"filename.pdf"}
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
                        
                        <div className='flex w-full justify-center'>
                        <button onClick={()=>router.push('/call')} className='bg-green-400 rounded-lg px-[20px] mt-[10px] text-gray-100 py-[10px]'>
                            Call Now
                        </button>
                        </div>
                        <span
                            className="close-button text-2xl cursor-pointer absolute top-2 right-2"
                            onClick={closeModal}
                        >
                            &times;
                        </span>
                    </div>
                    <div className="blur-background fixed top-0 left-0 w-full h-full backdrop-filter backdrop-blur-sm"></div>
                </div>
            )}
        </>
    );
};

export default DocumentModal;
