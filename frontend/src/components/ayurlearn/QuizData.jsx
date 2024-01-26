import React, { useState } from "react";
import { useRouter } from "next/router";

const QuizData = ({ quizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const router = useRouter();

  const handleOptionClick = (option) => {
    if (option === quizData[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(option);
    setShowFeedback(true);

    setTimeout(() => {
      if (currentQuestionIndex + 1 < quizData.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Quiz is finished
        alert(`Quiz finished! Your score: ${score}/${quizData.length}`);
        router.push("../")
      }
      setSelectedOption(null);
      setShowFeedback(false);
    }, 1000);
  };

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">
        {currentQuestion.question}
      </h1>
      <div>
        {currentQuestion.options.map((option, index) => (
          <div
            key={index}
            className={`p-2 mb-2 rounded cursor-pointer ${
              showFeedback &&
              (option === currentQuestion.correctAnswer
                ? "bg-green-200 border-green-500"
                : option === selectedOption
                ? "bg-red-200 border-red-500"
                : "")
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <p className="mt-4">Score: {score}</p>
    </div>
  );
};

export default QuizData;