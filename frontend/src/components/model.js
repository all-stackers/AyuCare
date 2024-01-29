import React, { useState, useRef, useEffect } from 'react';
import { ScaleLoader } from 'react-spinners';

const Modal = ({ isOpen, closeModal, aiResponse }) => {

    const modalRef = useRef(null);

    const handleBlurBackgroundClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleBlurBackgroundClick);
        } else {
            document.removeEventListener('mousedown', handleBlurBackgroundClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleBlurBackgroundClick);
        };
    }, [isOpen]);

    return (

        <>

{isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="modal-overlay bg-transparent fixed top-0 left-0 w-full h-full" onClick={closeModal}></div>
          <div className="modal-content bg-white p-12 rounded shadow-lg relative z-10 w-[40%]">
            <p className="text-lg text-gray-800">
              {aiResponse}
            </p>
            {aiResponse.length==0 && <div className="flex flex-col gap-y-[10px] mt-[20px] items-center">
                  <ScaleLoader color="#7C3AED" />
                  Getting Response...
                </div>}
            <span
              className="close-button text-2xl cursor-pointer absolute top-2 right-2"
              onClick={closeModal}
            >
              &times;
            </span>
          </div>
          <div className="blur-background fixed top-0 left-0 w-full h-full backdrop-filter backdrop-blur-lg"></div>
        </div>
      )}
        </>
    );
};

export default Modal;
