import React, { useState, useEffect, useContext } from "react";
import ayurvedicQuiz from "@/utils/ayurvedicQuizData";
import { useRouter } from "next/router";
import axios from "axios";
import { AppContext } from "@/context/appContext";

const AyurvedicQuiz = () => {
  const appContext = useContext(AppContext);
  const quizData = ayurvedicQuiz;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Initialize counters for Vata, Pitta, and Kapha
  const [vataCounter, setVataCounter] = useState(0);
  const [pittaCounter, setPittaCounter] = useState(0);
  const [kaphaCounter, setKaphaCounter] = useState(0);

  const router = useRouter();

  const postData = async () => {
    const token = localStorage.getItem('access_token')
    try {
      const response = await axios.post(
        'http://localhost:5000/addDosa',
        {
          vata: vataCounter,
          pitta: pittaCounter,
          kapha: kaphaCounter,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = response.data;
      appContext.setUserDetails(data.data);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
    finally {
      router.push("/user/dashboard");
    }
  };

  const handleOptionClick = async (option, dosha) => {
    setSelectedOption(option);
    setShowFeedback(true);

    console.log(currentQuestionIndex)

    // Update the corresponding Dosha counter



    if (vataCounter + pittaCounter + kaphaCounter < 10) {
      if (dosha === 0) {
        setVataCounter(vataCounter + 1);
      } else if (dosha === 1) {
        setPittaCounter(pittaCounter + 1);
      } else if (dosha === 2) {
        setKaphaCounter(kaphaCounter + 1);
      }
    }
    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }




    setSelectedOption(null);
    setShowFeedback(false);
  };

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div>
      <br />
      <div className="mx-auto mt-[40px] w-[600px]">
        <h3 className="font-bold text-xl">
          Ayurvedic Dosha Quiz: Discover Your Elemental Balance
        </h3>
        <br />
        <div className="border p-4">
          <h1 className="text-2xl font-semibold mb-4">
            {currentQuestion.question}
          </h1>
          <div>
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`p-2 w-[420px] mb-2 cursor-pointer text-base text-slate-500 rounded-xl hover:border-2 hover:border-inherit hover:bg-purple-light
            ${showFeedback &&
                  (option === selectedOption ? "bg-green-200 border-red-500" : "")
                  }`}
                onClick={() => handleOptionClick(option, index)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-row place-content-around">
          <div className="w-[130px] text-center rounded-lg py-[5px] bg-[#72c3ed] text-white text-xl font-bold">
            Vata: {vataCounter}
          </div>
          <div className="w-[130px] text-center rounded-lg py-[5px] bg-[#e67b1c] text-xl text-white font-bold">
            Pitta: {pittaCounter}
          </div>
          <div className="w-[130px] text-center rounded-lg py-[5px] bg-[#99cb23] text-xl text-white font-bold">
            Kapha: {kaphaCounter}
          </div>
        </div>

        {currentQuestionIndex == 9 && <button className='flex flex-row gap-x-[10px] mt-[50px] ml-auto mr-auto items-center outline-none text-white bg-purple-dark font-medium px-[22px] py-[8px] rounded-[5px] text-[14px] box-border'
          onClick={postData}
        >
          Complete
        </button>}
      </div>
    </div>
  );
};

export default AyurvedicQuiz;
