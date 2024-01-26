import React, { useState } from 'react'
import axios from 'axios'
import { ScaleLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const AyurvedicRemediesForDisease = () => {
    const [disease, setDisease] = useState([])
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const onEnterPress = async (event) => {
        if (event.key === 'Enter') {
            if (disease.length === 0) {
                toast.error('Please enter the disease')
                return
            }
            setData(null)
            setLoading(true)
            try {
                const response = await axios.post('http://localhost:5000/getAyurvedicRemedies', {
                    disease: disease
                })
    
                const data = response.data
                setData(data.data)
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
                setDisease('')
            }
        }
    }

    return (
        <div className='w-[60%] ml-auto mr-auto flex flex-col items-center h-full'>

            <div className='text-[26px] m-[10px] mb-[60px] border-b-[1px] border-[#ababad]'>
                Ayurvedic Remedies For Disease
            </div>

            {data !== null && <div className='flex flex-col w-full font-medium text-[24px]'>
                <div className='flex flex-row text-[24px]'>
                    <span className='flex flex-row text-dark2 mr-[15px] min-w-[270px]'>
                        Disease Name
                        <span className='ml-auto mr-[15px]'>:</span>
                    </span>
                    {data.disease}
                </div>
                <div className='flex flex-row text-[24px] mt-[20px]'>
                    <span className='flex flex-row text-dark2 mr-[15px] min-w-[270px]'>
                        Remedies
                        <span className='ml-auto mr-[15px]'>:</span>
                    </span>
                {data.remedy}</div>
            </div>}

            {loading &&
                <div className='flex flex-col gap-y-[10px] items-center justify-center m-auto text-[16px] text-[#606060]'>
                    <ScaleLoader  color='#7C3AED'/>
                    Hold on!
                </div>
            }

            <input className='h-[50px] w-full ml-auto mr-auto mt-auto mb-[50px] rounded-[10px] bg-purple-light border-[1px] border-purple-dark px-[30px] box-border text-[#000000] outline-none' 
                placeholder='Enter The disease you are suffering from...'
                value={disease}
                onKeyDown={onEnterPress}
                onChange={(event) => {
                    setDisease(event.target.value)
                }}
            />
        </div>
    )
}

export default AyurvedicRemediesForDisease
