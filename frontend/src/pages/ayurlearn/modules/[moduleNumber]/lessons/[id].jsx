import React from "react";
import { useRouter } from "next/router";

import Navbar from "@/components/ayurlearn/Navbar";

import moduleLessons from "@/utils/moduleLesson";
import modules from "@/utils/modules";
import Link from "next/link";

const Lessons = () => {
  const router = useRouter();
  const id = parseInt(router.query.moduleNumber);
  const lessonId = parseInt(router.query.id);
  const module = modules[id - 1];
  // console.log(moduleLessons[id]?.(lessonId - 1));
  if (moduleLessons[id]) {
    var lesson = moduleLessons[id][lessonId - 1];
  }
  console.log(module);
  console.log(lesson);
  return (
    <div className="modules mb-[20px]">
      <Navbar />
      {module ? (
        <div className="w-[900px] mx-auto mt-[20px] flex flex-col">
          <h1 className="text-[18px] font-bold">
            Module {module?.number}. {module?.title}
          </h1>
          <span className={`w-[400px] h-[5px] my-[5px] bg-[#D1C36F]`}></span>
          <div className="flex flex-row justify-between">
            <h1 className="text-[32px] my-[10px] font-bold">{lesson.title}</h1>
            <Link href={`../../${module.number}`}>
              <p className="mt-[25px] text-[#1669C9] cursor-pointer mr-[30px]">
                &larr; Back to Chapters
              </p>
            </Link>
          </div>

          <hr className="mt-[15px]" />
          <div className="w-[650px] mt-[40px] mx-auto">
            <p className="tracking-wide	text-[17px] text-gray-600">
              {lesson.data}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Lessons;
