import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { AppContext } from '@/context/appContext'
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Animation
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from '@/components/progress/AnimatedProgressProvider';
import ChangingProgressProvider from '@/components/progress/ChangingProgressProvider';

// Radial separators
import RadialSeparators from '@/components/progress/RadialSeparators';
// import { Router } from 'express';
import { useRouter } from 'next/router';
import { ScaleLoader } from 'react-spinners';


const profile = () => {
    const router = useRouter()
    const appContext = useContext(AppContext)
    const [userDetails, setUserDetails] = useState({})
    const [aiResponse, setAiResponse] = useState("")
    const [loadingAI, setLoadingAI] = useState(false)

    useEffect(() => {
        if (!appContext.checkingIfLoggedIn && !appContext.isUserLoggedIn) {
            router.push('/login')
        }
        else 
            setUserDetails(appContext.userDetails)
    }, [appContext])

    const onAskAIhandler = () => {
        setLoadingAI(true)
        const token = localStorage.getItem('access_token')

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = "";

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:5000/doshaTreatment", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.data)
            setAiResponse(result.data)
        })
        .catch(error => console.log('error', error))
        .finally(() => setLoadingAI(false))
    }

    const percentage = 0;
    return (
        <>
            {userDetails && <div className='w-[100%]  flex h-full overflow-scrol'>
                <div className='w-[75%] h-[100%] '>
                    <div className='h-[300px]  p-[30px] flex justify-evenly'>
                        <div className='h-[100%] w-[25%] flex flex-col justify-center'>

                            <div style={{width: 180, height: 180}}>
                                <CircularProgressbar
                                    value={userDetails.vata*10}
                                    text={`${userDetails.vata*10}%`}
                                    background
                                    backgroundPadding={6}
                                    styles={buildStyles({
                                        backgroundColor: "#3e98c7",
                                        textColor: "#fff",
                                        pathColor: "#fff",
                                        trailColor: "transparent",
                                        textSize: "14px"
                                    })}
                                />
                                <h1 className='m-[20px] ml-[60px] font-bold text-[25px]'>Vatta</h1>
                            </div>

                        </div>
                        <div className='h-[100%] w-[25%] flex flex-col justify-center'>


                            <div style={{ width: 180, height: 180 }}>
                                <CircularProgressbar
                                    value={userDetails.pitta*10}
                                    text={`${userDetails.pitta*10}%`}
                                    background
                                    backgroundPadding={6}
                                    styles={buildStyles({
                                        backgroundColor: "#3e98c7",
                                        textColor: "#fff",
                                        pathColor: "#fff",
                                        trailColor: "transparent",
                                        textSize: "14px"
                                    })}
                                />
                                <h1 className='m-[20px] text-[25px] ml-[60px] font-bold'>Pitta</h1>


                            </div>
                        </div>

                        <div className='h-[100%] w-[25%] flex flex-col justify-center items-center'>

                            <div style={{width: 180, height: 180}}>
                                <CircularProgressbar
                                    value={userDetails.kapha*10}
                                    text={`${userDetails.kapha*10}%`}
                                    background
                                    backgroundPadding={6}
                                    styles={buildStyles({
                                        backgroundColor: "#3e98c7",
                                        textColor: "#fff",
                                        pathColor: "#fff",
                                        trailColor: "transparent",
                                        textSize: "14px"
                                    })}
                                />
                                <h1 className='m-[20px] ml-[60px] text-[25px] font-bold'>Kapha</h1>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        
                        {(parseInt(userDetails.vata) + parseInt(userDetails.pitta) + parseInt(userDetails.kapha)) > 0 && 
                        <div className='flex flex-col items-start gap-y-[10px] max-w-[700px] h-auto'>
                            {!loadingAI ? 
                                <button className='flex flex-row gap-x-[10px] items-center ml-[30px] mt-[30px] outline-none text-white bg-purple-dark font-medium px-[22px] py-[8px] rounded-[5px] text-[14px] box-border'
                                    onClick={onAskAIhandler}
                                >
                                    Ask AI
                                </button>
                            :
                                <div className='flex justify-center items-center ml-[30px] mt-[30px]'>
                                    <ScaleLoader color='#7C3AED'/>
                                    Loading your Dosha Treatment...
                                </div>
                            }
                            {aiResponse.length > 0 && <div className='ml-[30px] pb-[20px]'>
                                {aiResponse}
                            </div>}
                        </div>}

                        <button className="bg-purple-dark w-[150px] h-[50px] p-[10px] ml-auto text-[white] rounded-[5px] my-[35px] mr-[150px]"
                        onClick={()=>{router.push('/ayurvedic-quiz')}}>Complete Profile</button>

                    </div>
                    <div className='flex justify-center'>
                    <hr className='w-[70%]'/>
                    </div>
                    
                    <div className='w-[100%] h-[450px] p-[30px] flex justify-around'>
                        <div className='w-[25%] h-[100%] rounded-[20px]  overflow-hidden drop-shadow-xl'>
                            <div className='w-[100%] h-[50%]'>
                                <img src="/assets/pitta.jpg" />
                            </div>
                            <div className='p-[10px]'>
                                <p className='w-[100%] h-[100%] text-[15px]'>Pitta characters generally have a strong digestive system and can tolerate virtually any food. Nonetheless, the food should calm the fire associated with Pitta; in other words, it should not be too pungent, salty or sour.
                                    The Pitta dosha is
                                    <a href="https://somatheeram.org/en/pitta/#:~:text=The%20Pitta%20dosha%20is%20strengthened,constricting%2C%20reductive%20and%20cooling%20impact. " className='text-[blue]' > ...read more</a>
                                </p>
                            </div>
                        </div>
                        <div className='w-[25%] h-[100%] rounded-[20px] overflow-hidden drop-shadow-xl'>
                            <div className='w-[100%] h-[50%] overflow-hidden'>
                                <img src="/assets/VATA.jpg" />
                            </div>
                            <div className='p-[10px]'>
                                <p className='w-[100%] h-[100%] text-[15px]'>According to Ayurveda, the five natural elements (ether, air, fire, water, and earth) are present in your mind and body, too—in form of the doshas: Vata (ether, air), Pitta (fire, water), and Kapha (water, earth).
                                    <a href="https://mapi.com/blogs/articles/understanding-vata-dosha " className='text-[blue]' > ...read more</a>
                                </p>
                            </div>
                        </div>
                        <div className='w-[25%] h-[100%] rounded-[20px] overflow-hidden drop-shadow-xl'>
                            <div className='w-[100%] h-[50%] overflow-hidden'>
                                <img src="/assets/kapha.png" />
                            </div>
                            <div className='p-[10px]'>
                                <p className='w-[100%] h-[100%] text-[15px]'>Kapha’s elemental makeup consists of water and earth. The common translation of kapha is “that which binds things” or “that which holds things together.”
                                    <a href="https://yogainternational.com/article/view/about-kapha/#:~:text=Kapha's%20elemental%20makeup%20consists%20of,support%20of%20our%20physical%20body. " className='text-[blue]' > ...read more</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[25%] h-[100%]  p-[40px]  items-center flex flex-col border-l-[1px] border-[#e4e4e7] '>
                    <div className=' w-[100px] h-[100px] rounded-[50%]  mb-[15px] border-2 border-[#e4e4e7]'>
                        <img src="/assets/profile.png" />
                    </div>

                    <h1 className=' font-[600]'>{userDetails.first_name} {userDetails.last_name}</h1>

                    <h1 className='text-[#bfc1c4] mb-[20px]'>Mumbai, India</h1>
                    {/* <div className='flex justify-around w-[100%] h-[50px] mb-[35px]'>
                        <div className='flex flex-col items-center '><img className='w-[20px] mb-[12px]' src="assets/call.png" /><h1 className='text-[#bfc1c4]'>Call</h1> </div>
                        <div className='flex flex-col items-center '><img className='w-[20px] mb-[12px]' src="assets/chat.png" /> <h1 className='text-[#bfc1c4]'>Video</h1></div>
                        <div className='flex flex-col items-center '><img className='w-[20px] mb-[12px]' src="assets/more.png" /> <h1 className='text-[#bfc1c4]'>More</h1></div>
                    </div> */}
                    {/* <div className='flex justify-between w-[100%] h-[100px]'>
                        <div className='h-[100%] w-[40%] border-2 border-[#bfc1c4] rounded-[10px] p-[10px] flex flex-col items-center'>
                            <h1 className='mb-[10px]'>Revenue</h1>
                            <h1 className='text-[25px] font-bold'>$4,300</h1>
                        </div>
                        <div className='h-[100%] w-[40%] border-2 border-[#bfc1c4] mb-[10px] rounded-[10px] p-[10px] flex flex-col items-center'>
                            <h1 className='mb-[10px]'>Web visists</h1>
                            <h1 className='text-[25px] font-bold'>40</h1>
                        </div>

                    </div> */}
                    <div className='w-[100%] h-[300px] mt-[20px] '>
                        <h1 className='text-[16px] font-medium mb-[25px]'>Information</h1>
                        {/* <div className='flex justify-between my-[12px]'>
                            <h1 className='text-[#bfc1c4]'>Email</h1>
                            <h1 className='font-bold'>ghosalkarharsh454@gmail.com</h1>
                        </div> */}
                        <div className='flex justify-between my-[12px]'>
                            <h1 className='text-[#bfc1c4]'>phone</h1>

                            <h1 className=' font-[600] '>+91 {userDetails.mobile_number}</h1>

                        </div>
                        <div className='flex justify-between my-[12px]'>
                            <h1 className='text-[#bfc1c4]'>Age</h1>

                            <h1 className=' font-[600] '>{userDetails.age}</h1>

                        </div>
                        <div className='flex justify-between my-[12px]'>
                            <h1 className='text-[#bfc1c4]'>Gender</h1>

                            <h1 className=' font-[600] '> {userDetails.gender}</h1>

                        </div>
                        <div className='flex justify-between my-[12px]'>
                            <h1 className='text-[#bfc1c4]'>Last visisted</h1>
                            <h1 className='font-bold'>08.45 PM</h1>
                        </div>
                    </div>
                    {/* </>
            ):""} */}
                </div>
            </div>}
        </>


    )
}

export default profile