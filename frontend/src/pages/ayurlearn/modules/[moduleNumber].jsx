import React from "react";
import Navbar from "@/components/ayurlearn/Navbar";
import moduleLessons from "@/utils/moduleLesson";
import { useRouter } from "next/router";
import modules from "@/utils/modules";
import Link from "next/link";

const Module = () => {
  const router = useRouter();
  const id = parseInt(router.query.moduleNumber);
  const module = modules[id - 1];
  console.log(module);
  return (
    <div className="modules mb-[20px]">
      <Navbar />
      {module ? (
        <div className="w-[900px] mt-[40px] pb-[20px] mx-auto flex flex-col ">
          <div className="flex flex-row">
            <h1 className="text-7xl font-san font-black ">{module.number}</h1>
            <span
              className={`w-[200px] h-[5px] mx-[20px] mt-[50px] bg-[${module.color}]`}
            ></span>
          </div>
          <h1 className="text-4xl font-bold">{module.title}</h1>
          <p className="text-base mt-[30px] mb-[20px] tracking-wide text-[#1669C9] cursor-pointer">
            Translate in हिंदी
          </p>
          <hr className="mb-[20px]" />
          {moduleLessons[id].map((lesson, index) => (
            <div className="mb-[30px]">
              <Link href={`${module.number}/lessons/${index + 1}`}>
                <h1 className="cursor-pointer hover:text-[#1669C9] mb-4 text-2xl font-bold">
                  {lesson.title}
                </h1>
              </Link>
              <p className="text-gray-700 tracking-wide">{lesson.content}</p>
            </div>
          ))}
          <Link href={`${id}/quiz`}>
            <button className="w-fit px-10 py-2  rounded-lg bg-[#1669C9] text-white hover:bg-[#222]">
              Take a Quiz
            </button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Module;
