import { useRouter } from 'next/router'
import React from 'react'

const AiSolutions = () => {
    const router = useRouter()

    return (
        <div className='flex justify-center items-center w-full h-full font-semibold'>
            <div className='grid grid-cols-3 gap-x-[25px] w-[70%] h-[400px]'>
                <div className='flex flex-col items-center justify-center rounded-md box-border border-[2px] border-[#424AE6] cursor-pointer hover:bg-purple-200 hover:border-[#FFFFFF] '
                    onClick={() => router.push('/ayurvedicRemediesForDisease')}
                >
                    <div className='flex flex-col justify-center text-center mt-auto mb-[30px] font-semibold text-[18px]'>
                        <img src='/assets/image.webp' alt="logo"/>
                        <div className='mt-auto mb-[30px['>
                            Disease to Ayurvedic Remedies
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center rounded-md box-border border-[2px] border-[#424AE6] cursor-pointer hover:bg-purple-200 hover:border-[#FFFFFF] '
                    onClick={() => router.push('/PredictDiseaseFromSymptoms')}
                >
                    <div className='flex flex-col  justify-center text-center mt-auto mb-[30px] font-semibold text-[18px]'>
                        <img src='/assets/symptoms.webp' alt="logo"/>
                        Symptoms to Disease with Ayurvedic medicines
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center rounded-md box-border border-[2px] border-[#424AE6] cursor-pointer hover:bg-purple-200 hover:border-[#FFFFFF] '
                    onClick={() => router.push('/alternateMedicines')}
                >
                    <div className='flex flex-col justify-center text-center mt-auto mb-[30px] font-semibold text-[18px]'>
                        <img src='/assets/medicine.webp' alt="logo"/>
                        Allopathy to Ayurvedic Medicines
                    </div>
                </div>
                {/* <div className=''></div>
                <div className=''></div> */}
            </div>
        </div>
    )
}

export default AiSolutions
