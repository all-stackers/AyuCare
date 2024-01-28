import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const Report = ({score}) => {
  return (
    <div className='flex flex-col'>
        <div className='flex justify-center items-center font-semibold text-[#514ADE] text-[32px] mb-[100px] mt-[50px]'>Final Report</div>
        
        <div className='flex flex-row gap-x-[60px] justify-center'>
            <div className='flex flex-col gap-y-[20px] w-[200px] h-[200px] border-[1px] border-[#514ADE] rounded-[5px] justify-center items-center relative'>
                <div>Emotional Resilience</div>
                <CircularProgressbar
                    className='w-[50%] text-[10px]'
                    value={7 * 10}
                    text={`${score.emotional_resilience} %`}
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#fff",
                        paddingLeft: '-10px',
                        textColor: "#514d4d",
                        pathColor: "#63D7F0",
                        trailColor: "#d4d4d4",
                        textSize: "16px",
                    })}
                />
            </div>

            <div className='flex flex-col gap-y-[20px] w-[200px] h-[200px] border-[1px] border-[#514ADE] rounded-[5px] justify-center items-center relative'>
                <div>Social Support</div>
                <CircularProgressbar
                    className='w-[50%] text-[10px]'
                    value={7 * 10}
                    text={`${score.social_support} %`}
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#fff",
                        paddingLeft: '-10px',
                        textColor: "#514d4d",
                        pathColor: "#ECAA46",
                        trailColor: "#d4d4d4",
                        textSize: "16px",
                    })}
                />
            </div>

            <div className='flex flex-col gap-y-[20px] w-[200px] h-[200px] border-[1px] border-[#514ADE] rounded-[5px] justify-center items-center relative'>
                <div>Coping Mechanisms</div>
                <CircularProgressbar
                    className='w-[50%] text-[10px]'
                    value={7 * 10}
                    text={`${score.coping_mechanisms} %`}
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#fff",
                        paddingLeft: '-10px',
                        textColor: "#514d4d",
                        pathColor: "#0D6FA7",
                        trailColor: "#d4d4d4",
                        textSize: "16px",
                    })}
                />
            </div>

            <div className='flex flex-col gap-y-[20px] w-[200px] h-[200px] border-[1px] border-[#514ADE] rounded-[5px] justify-center items-center relative'>
                <div>Self-awareness</div>
                <CircularProgressbar
                    className='w-[50%] text-[10px]'
                    value={7 * 10}
                    text={`${score.self_awareness} %`}
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#fff",
                        paddingLeft: '-10px',
                        textColor: "#514d4d",
                        pathColor: "#2DB453",
                        trailColor: "#d4d4d4",
                        textSize: "16px",
                    })}
                />
            </div>

            <div className='flex flex-col gap-y-[20px] w-[200px] h-[200px] border-[1px] border-[#514ADE] rounded-[5px] justify-center items-center relative'>
                <div>Problem-solving</div>
                <CircularProgressbar
                    className='w-[50%] text-[10px]'
                    value={7 * 10}
                    text={`${score.problem_solving} %`}
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#fff",
                        paddingLeft: '-10px',
                        textColor: "#514d4d",
                        pathColor: "#514ADE",
                        trailColor: "#d4d4d4",
                        textSize: "16px",
                    })}
                />
            </div>
        </div>

            {/* <CircularProgressbar
                value={7 * 10}
                text={7 * 10}
                background
                backgroundPadding={6}
                styles={buildStyles({
                    backgroundColor: "#fff",
                    textColor: "#514d4d",
                    pathColor: "#71a6b3",
                    trailColor: "#d4d4d4",
                    textSize: "16px",
                })}
            /> */}
    </div>
  )
}

export default Report
