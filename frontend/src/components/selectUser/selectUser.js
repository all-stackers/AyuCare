import { useState } from "react"

const SelectUser = ({
    user,
    setUser,
    onContinueRegistrationClickHandler,
    continueTo="Signup"
}) => {
    // const [state, setState] = useState('1')


    return(
        <div className="flex flex-col w-[100%] h-[100%] items-center font-inter">
        {/* <> */}
            <div className="mt-[60px] text-[#404040] font-semibold text-[28px]">Select Your User Profile</div>
            <div className="text-[#909090] font-semibold text-[16px]">Your role helps us personalize your experience</div>
            <div className="flex flex-row w-[90%] m-auto justify-between">
                <div className={`relative flex items-center justify-center rounded-md h-[300px] w-[45%] box-border ${user == '1' ? "border-[#424AE6] border-[2px] bg-[#F4F8FE]" : "border-gray-200 border-[1.5px]"} cursor-pointer`}
                    onClick={() => setUser('1')}
                >
                    <div className={`absolute right-[10px] top-[10px] w-[30px] h-[30px] border-gray-200 border rounded-full ${user == '1' && "bg-[#424AE6]"}`}>
                        {user == '1' &&<img className="" src="/assets/tick-white.svg" alt="tick-image"/>}
                    </div>

                    <img src="/assets/patientIllustration.png" className="w-[80%]" />
                </div>

                <div className={`relative flex items-center justify-center rounded-md h-[300px] w-[45%] box-border ${user == '2' ? "border-[#424AE6] border-[2px] bg-[#F4F8FE]" : "border-gray-200 border-[1.5px]"} cursor-pointer`}
                    onClick={() => setUser('2')}
                >
                    <div className={`absolute right-[10px] top-[10px] w-[30px] h-[30px] border-gray-200 border rounded-full ${user == '2' && "bg-[#424AE6]"}`}>
                        {user == '2' && <img className="" src="/assets/tick-white.svg" alt="tick-image"/>}
                    </div>

                    <img src="/assets/docter.webp" className="w-[80%] h-[50%]"/>
                </div>
            </div>
            <button
                type="submit"
                className="flex flex-row items-center gap-x-[10px] bg-blue py-[8px] px-[24px] rounded-lg text-white mb-[40px] bg-purple-dark"
                onClick={onContinueRegistrationClickHandler}
            >
                Continue {continueTo}
                <img className="h-[12px]" src="/assets/right-arrow-white.svg" alt="right arrow" />
            </button>
        {/* </> */}
        </div>
    )
}

export default SelectUser;