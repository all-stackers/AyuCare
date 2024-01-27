import React from 'react'
import { useState,useEffect } from 'react'
// import AyurvedicProfileTest from '@/constants/AnimatedProgressProvider'
import { useRouter } from 'next/router';
// import { AppContext } from '@/context/appContext'
// import ScaleLoader from "react-spinners/ScaleLoader";

const home = () => {
    const router = useRouter()
    const [vatha, setVatha] = useState(0)
    const [pitta, setPitta] = useState(0)
    const [kapha, setKapha] = useState(0)

    const ayur = {
        "quizTitle": "Ayurvedic Dosha Quiz",
        "questions": [
          {
            "question": "Body Build:",
            "choices": [
              "Thin and lean",
              "Medium build",
              "Solid and sturdy"
            ]
          },
          {
            "question": "Skin Texture:",
            "choices": [
              "Dry, rough, or thin skin",
              "Sensitive, fair, or warm skin",
              "Oily, smooth, or cool skin"
            ]
          },
          {
            "question": "Hair Type:",
            "choices": [
              "Thin, dry, or curly hair",
              "Fine, straight, or thinning hair",
              "Thick, wavy, or oily hair"
            ]
          },
          {
            "question": "Preferred Climate:",
            "choices": [
              "Love warmth, dislike cold",
              "Prefer moderate temperatures",
              "Thrive in cooler weather"
            ]
          },
          {
            "question": "Appetite:",
            "choices": [
              "Variable; often forget to eat",
              "Strong appetite, get irritable if meals are missed",
              "Steady appetite; can skip meals without issues"
            ]
          },
          {
            "question": "Digestion:",
            "choices": [
              "Irregular, prone to bloating, and gas",
              "Strong, prone to heartburn or acidity",
              "Slow but steady, can handle heavy foods"
            ]
          },
          {
            "question": "Sleep Pattern:",
            "choices": [
              "Light sleeper, often experience insomnia",
              "Moderate sleeper, occasionally wake up at night",
              "Deep sleeper, rarely wake up during the night"
            ]
          },
          {
            "question": "Emotions:",
            "choices": [
              "Anxious, worry easily, and have racing thoughts",
              "Quick to anger, driven, and competitive",
              "Calm, patient, and sometimes complacent"
            ]
          },
          {
            "question": "Response to Stress:",
            "choices": [
              "Get anxious, fearful, or overwhelmed",
              "Become impatient, irritable, or critical",
              "Stay calm, but can become lethargic or withdrawn"
            ]
          },
          {
            "question": "Exercise Preference:",
            "choices": [
              "Prefer gentle, grounding exercises like yoga",
              "Enjoy moderate, competitive exercises like jogging or swimming",
              "Thrive in intense, challenging workouts"
            ]
          }
        ]
      }
    

    const [currentQuestion, setCurrentQuestion] = useState(0);
	
	const handleAnswerOptionClick = () => {
		// if(currentQuestion>ayur.questions.length){
        // console.log("vatha",vatha);
        // console.log("pitta",pitta);
        // console.log("kapha",kapha);
        
        // }
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < ayur.questions.length) {
			setCurrentQuestion(nextQuestion);
		}  else {
			router.push('/home')
		}
	};
    // useEffect(() => {
    //     if(currentQuestion>ayur.questions.length){
    //         console.log("vatha",vatha);
    //         console.log("pitta",pitta);
    //         console.log("kapha",kapha);
    //         router.push('/home')
    //         }
    // }, [vatha,pitta,kapha])

    

   

    return (
        <div className='w-[100%] py-[50px] px-[250px] h-[100%] '>
            <h1 className="text-[45px] font-bold mb-10">Test Analysis</h1>
           
                        <div  className='w-[100%] h-[250px] justify-center mb-[50px] border-2 border-gray rounded-[5px] pt-[20px]'  >
                           
                        <>
                                    <h1 className='text-[20px] font-[600] m-[20px]'>{ayur.questions[currentQuestion].question}</h1>
                                    <div className='flex bt-[20px]'>

                                      
                                        <button className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-purple-dark focus:text-[white] focus:bg-purple-dark hover:border-purple-dark block w-full p-2.5 m-[10px]" placeholder="xyz"
                                            onClick={(event) => {
                                                setVatha(vatha + 1);
                                                handleAnswerOptionClick();
                                            }}
                                        >{ayur.questions[currentQuestion].choices[0]}</button>

                                        <button className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-dark focus:text-[white] focus:bg-purple-dark hover:border-purple-dark block w-full p-2.5 m-[10px]" placeholder="xyz"
                                            onClick={(event) => {
                                                setPitta(pitta + 1);
                                                handleAnswerOptionClick();
                                            }}
                                        >{ayur.questions[currentQuestion].choices[1]}</button>

                                        <button className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-dark focus:text-[white] focus:bg-purple-dark hover:border-purple-dark block w-full p-2.5 m-[10px]" placeholder="xyz"
                                            onClick={(event) => {
                                                setKapha(kapha + 1);
                                                handleAnswerOptionClick();
                                            }}
                                        >{ayur.questions[currentQuestion].choices[2]}</button>

                                    </div>
                                </>
                            

                        </div>
                    



          
        </div>
    )
}

export default home