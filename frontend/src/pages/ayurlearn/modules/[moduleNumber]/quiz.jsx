import React from "react";
import Navbar from "@/components/ayurlearn/Navbar";
import { useRouter } from "next/router";
import modules from "@/utils/modules";
import QuizData from "@/components/ayurlearn/QuizData";
import quizData from "@/utils/quiz";

const Quiz = () => {
  const router = useRouter();
  const id = parseInt(router.query.moduleNumber);
  const module = modules[id - 1];

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

          <hr className="my-[20px]" />
          <QuizData quizData={quizData} />
        </div>
      ) : null}
      ;
    </div>
  );
};

export default Quiz;
