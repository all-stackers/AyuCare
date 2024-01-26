import React, { useState } from 'react'
import axios from 'axios'
import { ScaleLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const AlternateMedicines = () => {
    const [medicineName, setMedicineName] = useState([])
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const onEnterPress = async (event) => {
        if (event.key === 'Enter') {
            if (medicineName.length === 0) {
                toast.error('Please enter the medicineName')
                return
            }
            setData(null)
            setLoading(true)
            try {
                const response = await axios.post('http://localhost:5000/getMedicineDetails', {
                    name: medicineName
                })
    
                const data = response.data
                setData(data.data)
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
                setMedicineName('')
            }
        }
    }

    console.log(data)

    return (
        <div className='w-[60%] ml-auto mr-auto flex flex-col items-center h-full'>

            <div className='text-[26px] m-[10px] mb-[60px] border-b-[1px] border-[#ababad]'>
                Alternate Ayurvedic Medicines for Allopathy
            </div>

            {/* {data !== null && <div className='flex flex-col w-full font-medium text-[24px]'>
                <div className='text-[24px]'>
                    <span className='text-dark2 mr-[15px]'>Symptoms &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span>
                    {data.symptoms}
                </div>
                <div className='text-[24px] mt-[20px]'>
                    <span className='text-dark2 mr-[15px]'>Disease Name &nbsp;: </span>
                {data.DiseaseName}</div>
                <div className='text-[24px] mt-[20px]'>
                    <span className='text-dark2 mr-[15px]'>Treatments &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span>
                </div>
                <div className='flex flex-col gap-y-[15px] mt-[30px]'>
                {data.Treatment.map((d, index) => {
                    return (
                        <div className='flex flex-row gap-x-[10px]'>
                            <div>{index+1}.</div>
                            <div>{d.treatmentName} : {d.treatment}</div>
                        </div>
                    )
                })}
                </div>
            </div>} */}


            {data !== null && <div className='flex flex-col w-full font-medium text-[24px]'>
                <div className='flex flex-row text-[24px]'>
                    <span className='flex flex-row text-dark2 mr-[15px] min-w-[270px]'>
                        Allopathy Medicine
                        <span className='ml-auto mr-[15px]'>:</span>
                    </span>
                    {data.name}
                </div>
                <div className='flex flex-row text-[24px] mt-[20px]'>
                    <span className='flex flex-row text-dark2 mr-[15px] min-w-[270px]'>
                        Manufacturer
                        <span className='ml-auto mr-[15px]'>:</span>
                    </span>
                {data.manufacturer_name}</div>
                <div className='flex flex-row text-[24px] mt-[20px]'>
                    <span className='flex flex-row text-dark2 mr-[15px] min-w-[270px]'>
                        Composition
                        <span className='ml-auto mr-[15px]'>:</span>
                    </span>
                    {data.short_composition1}
                </div>
                <div className='flex flex-row text-[24px] mt-[20px]'>
                    <span className='flex flex-row text-dark2 mr-[15px] min-w-[270px]'>
                        Ayurvedic alternative
                        <span className='ml-auto mr-[15px]'>:</span>
                    </span>
                    {data.ayurvedic_alternative}
                </div>
                <div className='flex flex-row text-[24px] mt-[20px]'>
                    <span className='flex flex-row text-dark2 mr-[15px] min-w-[270px]'>
                        Information about alternative
                        <span className='ml-auto mr-[15px]'>:</span>
                    </span>
                    {data.information_about_alternative}
                </div>
            </div>}


            {loading &&
                <div className='flex flex-col gap-y-[10px] items-center justify-center m-auto text-[16px] text-[#606060]'>
                    <ScaleLoader  color='#7C3AED'/>
                    Hold on!
                </div>
            }

            <input className='h-[50px] w-full ml-auto mr-auto mt-auto mb-[50px] rounded-[10px] bg-purple-light border-[1px] border-purple-dark px-[30px] box-border text-[#000000] outline-none' 
                placeholder='Enter The medicine name for which you want to find the ayurvedic alternative...'
                value={medicineName}
                onKeyDown={onEnterPress}
                onChange={(event) => {
                    setMedicineName(event.target.value)
                }}
            />
        </div>
    )
}

export default AlternateMedicines
