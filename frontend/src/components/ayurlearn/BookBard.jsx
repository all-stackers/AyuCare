import React from "react";
import Link from "next/link";

const BookBard = ({ number, color, title, link, content }) => {
  return (
    <div className="prompt_card">
      <div className="flex flex-row w-full">
        <span className="module_number text-4xl font-bold text-gray-900">
          {number}
        </span>
        <span
          className={`w-full mt-[17px] ml-[10px] h-[5px] bg-[${color}]`}
        ></span>
      </div>
      <h1 className="text-2xl my-[15px] font-bold">{title}</h1>
      <div className="border border-1 my-[5px] p-[20px] w-fit">
        <img className="w-[80px] h-auto" src="/PDF_file.svg" alt={title} />
      </div>
      <p className="my-4 text-sm text-gray-700">{content}</p>
      <div className="flex flex-row ">
        <Link href={link} target="_blank">
          <p className="text-sm text-[#1669C9] cursor-pointer mr-[30px]">
            Download PDF
          </p>
        </Link>
      </div>
    </div>
  );
};

export default BookBard;
