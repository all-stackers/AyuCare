import Link from "next/link";
import React, { useState, useEffect } from "react";

const ModuleCard = ({ number, color, title, content }) => {
  const [hindiNumber, setHindiNumber] = useState(number);
  const [hindiTitle, setHindiTitle] = useState(title);
  const [hindiContent, setHindiContent] = useState(content);
  const [loading, setLoading] = useState(false); // Track loading state
  const translateText = async (text) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        return data.translation;
      } else {
        return "Error occurred";
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const translateHindi = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      const translatedNumber = await translateText(number);
      const translatedTitle = await translateText(title);
      const translatedContent = await translateText(content);

      setHindiNumber(translatedNumber);
      setHindiTitle(translatedTitle);
      setHindiContent(translatedContent);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };
  return (
    <div className="prompt_card">
      <div className="flex flex-row w-full">
        <span className="module_number text-4xl font-bold text-gray-900">
          {hindiNumber}
        </span>
        <span
          className={`w-full mt-[17px] ml-[10px] h-[5px] bg-[${color}]`}
        ></span>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link href={`modules/${number}`}>
            <p className="text-2xl hover:text-[#1669C9] font-bold text-[#222]">
              {hindiTitle}
            </p>
          </Link>

          <p className="my-4 text-sm text-gray-700">{hindiContent}</p>
          <div className="flex flex-row ">
            <Link href={`modules/${number}`}>
              <p className="text-sm text-[#1669C9] cursor-pointer mr-[30px]">
                View Module
              </p>
            </Link>
            <p
              className="text-sm text-[#1669C9] cursor-pointer"
              onClick={translateHindi}
            >
              Translate हिंदी
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ModuleCard;
