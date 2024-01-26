import React from "react";
import Link from "next/link";

const VideoCard = ({ number, color, title, link, description }) => {
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <div className="flex flex-col w-full">
            <div className="flex flex-row w-full">
              <span className="module_number text-4xl font-bold text-gray-900">
                {number}
              </span>
              <span
                className={`w-full mt-[17px] ml-[10px] h-[5px] bg-[${color}]`}
              ></span>
            </div>
            <div className="border border-1 my-[5px] p-[20px]">
              <iframe
                className="mx-auto w-full h-[220px]"
                src={link}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    fullscreen
              ></iframe>
            </div>
            <p className="text-xl hover:text-[#1669C9] font-bold text-[#222]">
              {title}
            </p>
          </div>
        </div>
      </div>

      <p className="my-4 text-sm text-gray-700">{description}</p>
      {/* <div className="flex flex-row ">
        <Link href={`modules/${number}`}>
          <p className="text-sm text-[#1669C9] cursor-pointer mr-[30px]">
            View Module
          </p>
        </Link>
        <p className="text-sm text-[#1669C9] cursor-pointer">Translate हिंदी</p>
      </div> */}
    </div>
  );
};

export default VideoCard;
