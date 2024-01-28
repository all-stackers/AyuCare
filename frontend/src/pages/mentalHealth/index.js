import React, { useState } from "react";
import Report from "@/components/report/report";

const data = [
  {
    question:
      "You've been feeling increasingly stressed about an upcoming exam or deadline. What would you do?",
    options: [
      {
        option:
          "Break the task into smaller, manageable steps and create a study/work plan.",
        parameter: "coping_mechanisms",
      },
      {
        option:
          "Procrastinate and avoid thinking about the exam or deadline until the last minute.",
        parameter: "coping_mechanisms",
      },
      {
        option:
          "Seek support from classmates or colleagues for study/work collaboration.",
        parameter: "social_support",
      },
      {
        option: "Become overwhelmed and give up on preparing altogether.",
        parameter: "emotional_resilience",
      },
    ],
    selected_option: "5",
  },
  {
    question:
      "You've been experiencing conflict with a close friend. What would you do?",
    options: [
      {
        option:
          "Initiate a conversation to address the issue and work towards resolution.",
        parameter: "problem-solving",
      },
      {
        option:
          "Distance yourself from the friend without attempting to resolve the conflict.",
        parameter: "emotional_resilience",
      },
      {
        option:
          "Hold onto resentment and avoid communicating your feelings to your friend.",
        parameter: "self-awareness",
      },
      {
        option:
          "Pretend everything is fine and ignore the conflict altogether.",
        parameter: "coping_mechanisms",
      },
    ],
    selected_option: "5",
  },
  {
    question:
      "You've been feeling disconnected from your friends and family lately. What would you do?",
    options: [
      {
        option:
          "Reach out to loved ones for support and plan social activities to reconnect.",
        parameter: "social_support",
      },
      {
        option:
          "Assume that relationships naturally drift apart and accept the distance.",
        parameter: "emotional_resilience",
      },
      {
        option:
          "Spend excessive time on social media to compensate for lack of real-life connections.",
        parameter: "coping_mechanisms",
      },
      {
        option:
          "Withdraw further from social interactions and isolate yourself.",
        parameter: "emotional_resilience",
      },
    ],
    selected_option: "5",
  },
  {
    question:
      "You've been struggling with negative thoughts about yourself. What would you do?",
    options: [
      {
        option:
          "Challenge negative thoughts and practice self-compassion and self-care.",
        parameter: "self-awareness",
      },
      {
        option:
          "Believe the negative thoughts and internalize them as truths about yourself.",
        parameter: "self-awareness",
      },
      {
        option:
          "Compare yourself to others on social media to validate your negative beliefs.",
        parameter: "coping_mechanisms",
      },
      {
        option:
          "Avoid confronting your negative thoughts and distract yourself with other activities.",
        parameter: "coping_mechanisms",
      },
    ],
    selected_option: "5",
  },
  {
    question:
      "You've been experiencing physical symptoms like headaches and stomachaches due to stress. What would you do?",
    options: [
      {
        option:
          "Prioritize self-care activities like exercise, healthy eating, and relaxation techniques.",
        parameter: "self-care",
      },
      {
        option:
          "Ignore the physical symptoms and hope they go away on their own.",
        parameter: "coping_mechanisms",
      },
      {
        option:
          "Take over-the-counter medication to alleviate the symptoms temporarily.",
        parameter: "coping_mechanisms",
      },
      {
        option:
          "Continue pushing through the stress without addressing its impact on your physical health.",
        parameter: "emotional_resilience",
      },
    ],
    selected_option: "5",
  },
  {
    question:
      "You've been feeling uninspired and unmotivated in your hobbies or interests. What would you do?",
    options: [
      {
        option:
          "Explore new activities or hobbies to reignite your passion and creativity.",
        parameter: "self-awareness",
      },
      {
        option:
          "Give up on your hobbies altogether since you no longer find them enjoyable.",
        parameter: "emotional_resilience",
      },
      {
        option:
          "Compare yourself to others who seem more successful in their hobbies, leading to self-doubt.",
        parameter: "self-awareness",
      },
      {
        option:
          "Force yourself to continue with your hobbies despite feeling uninterested or drained.",
        parameter: "emotional_resilience",
      },
    ],
    selected_option: "5",
  },
  {
    question:
      "You've been experiencing conflict with a roommate or housemate. What would you do?",
    options: [
      {
        option:
          "Address the conflict directly and attempt to find a mutually beneficial solution through open communication.",
        parameter: "problem-solving",
      },
      {
        option:
          "Avoid confrontation and silently resent your roommate's behavior.",
        parameter: "coping_mechanisms",
      },
      {
        option:
          "Blame your roommate for the conflict and refuse to compromise.",
        parameter: "self-awareness",
      },
      {
        option:
          "Move out without attempting to resolve the conflict or communicate your concerns.",
        parameter: "emotional_resilience",
      },
    ],
    selected_option: "5",
  },
  {
    question:
      "You've been feeling overwhelmed by negative news and events happening in the world. What would you do?",
    options: [
      {
        option:
          "Limit exposure to news and media outlets to protect your mental well-being.",
        parameter: "coping_mechanisms",
      },
      {
        option:
          "Obsessively consume news and information to stay informed, despite feeling anxious or distressed.",
        parameter: "emotional_resilience",
      },
      {
        option:
          "Share negative news and opinions on social media to vent your frustrations.",
        parameter: "social_support",
      },
      {
        option:
          "Feel hopeless and powerless to make a difference in the face of global issues.",
        parameter: "emotional_resilience",
      },
    ],
    selected_option: "5",
  },
  {
    question:
      "You've been experiencing difficulty concentrating and completing tasks due to racing thoughts. What would you do?",
    options: [
      {
        option:
          "Practice mindfulness and grounding techniques to quiet your mind and improve focus.",
        parameter: "self-awareness",
      },
      {
        option:
          "Ignore the racing thoughts and try to push through the distractions.",
        parameter: "emotional_resilience",
      },
      {
        option:
          "Engage in escapist behaviors like binge-watching TV or excessive internet use to avoid confronting the thoughts.",
        parameter: "coping_mechanisms",
      },
      {
        option:
          "Feel overwhelmed by the racing thoughts and give up on completing tasks altogether.",
        parameter: "emotional_resilience",
      },
    ],
    selected_option: "5",
  },
  {
    question: "You've been experiencing financial stress. What would you do?",
    options: [
      {
        option:
          "Create a budget and explore practical solutions to manage your finances more effectively.",
        parameter: "problem-solving",
      },
      {
        option:
          "Avoid thinking about your financial situation and hope it improves on its own.",
        parameter: "coping_mechanisms",
      },
      {
        option:
          "Rely on credit cards or loans to temporarily alleviate financial pressure.",
        parameter: "coping_mechanisms",
      },
      {
        option:
          "Feel ashamed or embarrassed about your financial struggles and avoid seeking help.",
        parameter: "self-awareness",
      },
    ],
    selected_option: "4",
  },
];

const Index = () => {
  const [questions, setQuestions] = useState(data);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [showReport, setShowReport] = useState(false);

  const onOptionClickHandler = (index) => {
    // Update the selected option field in the questions array
    let updatedQuestions = [...questions];
    updatedQuestions[selectedQuestion].selected_option = index + 1;
    setQuestions(updatedQuestions);

    // Move to the next question or show report
    if (selectedQuestion < questions.length - 1) {
      setSelectedQuestion(selectedQuestion + 1);
    }
  };

  const calculateScore = () => {
    let coping_mechanisms = 0;
    let emotional_resilience = 0;
    let problem_solving = 0;
    let self_awareness = 0;
    let social_support = 0;

    const coping_mechanisms_original = 13;
    const emotional_resilience_original = 12;
    const problem_solving_original = 3;
    const self_awareness_original = 8;
    const social_support_original = 3;

    questions.forEach((question) => {
      const selectedParameter = question.options[question.selected_option - 1].parameter
      switch (selectedParameter) {
        case "coping_mechanisms":
          coping_mechanisms++;
          break;
        case "emotional_resilience":
          emotional_resilience++;
          break;
        case "problem_solving":
          problem_solving++;
          break;
        case "self-awareness":
          self_awareness++;
          break;
        case "social_support":
          social_support++;
          break;
      }
    });

    const coping_mechanisms_score = Math.round(
      (coping_mechanisms / coping_mechanisms_original) * 100
    );
    const emotional_resilience_score = Math.round(
      (emotional_resilience / emotional_resilience_original) * 100
    );
    const problem_solving_score = Math.round(
      (problem_solving / problem_solving_original) * 100
    );
    const self_awareness_score = Math.round(
      (self_awareness / self_awareness_original) * 100
    );
    const social_support_score = Math.round(
      (social_support / social_support_original) * 100
    );

    const score = {
        coping_mechanisms: coping_mechanisms_score,
        emotional_resilience: emotional_resilience_score,
        problem_solving: problem_solving_score,
        self_awareness: self_awareness_score,
        social_support: social_support_score,
    }
    return score;
  };

  return (
    <div className="flex flex-col">
      <div className="mt-[55px] ml-[75px] font-semibold text-[32px]">
        Mental health quiz
      </div>

      <div className="mt-[10px] ml-auto mr-[140px] font-medium text-[#404040]">
        Question {selectedQuestion + 1} / {questions.length}
      </div>

      {selectedQuestion == 9 ? (
        <div>
        {showReport ?
          (<Report score={calculateScore()} />)
        :
          (<div className="flex justify-center items-center h-full">
            <div className="bg-[#D3D1FF] text-[#404040] font-semibold text-[22px] px-8 py-4 rounded-md shadow-lg cursor-pointer mt-[100px]"
              onClick={() => setShowReport(true)}
            >
              Show report
            </div>
          </div>)
        }
        </div>
      ) : (
        <div>
          <div className="mt-[60px] ml-[75px] font-semibold text-[#514ADE] text-[22px]">
            Q. {questions[selectedQuestion].question}
          </div>
          <div className="flex flex-col gap-y-[20px] mt-[70px] ml-[75px]">
            {questions[selectedQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`flex flex-row box-border w-[960px] h-[70px] items-center px-[30px] gap-x-[30px] hover:bg-[#D3D1FF] cursor-pointer text-semibold text-[#404040] bg-[#F4F7FA] border-[1px] border-[#514ADE] rounded-[10px] ${
                  questions[selectedQuestion].selected_option === index + 1
                    ? "bg-[#D3D1FF]"
                    : ""
                }`}
                onClick={() => onOptionClickHandler(index)}
              >
                <div>A. </div>
                <div>{option.option}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;