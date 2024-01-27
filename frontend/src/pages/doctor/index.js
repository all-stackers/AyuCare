import React, { useState } from 'react';
// import "./custom.css"
import { useRouter } from "next/router";

const MedicalSpecialists = () => {
    const router = useRouter();
   
  const [selectedSpecialist, setSelectedSpecialist] = useState('All');

  const specialists = ['All', 'MBBS', 'Dentist', 'Dermatologist', 'Orthopedic', 'Cardiologist', 'Pediatrician', 'Oncologist', 'Neurologist', 'Gynecologist'];
   
  const doctors = [
    { name: 'Dr. John Doe', specialization: 'MBBS', gender: 'Male' },
    { name: 'Dr. Jane Smith', specialization: 'Dentist', gender: 'Female' },
    { name: 'Dr. David Johnson', specialization: 'Dermatologist', gender: 'Male' },
    { name: 'Dr. Emily White', specialization: 'Orthopedic', gender: 'Female' },
    { name: 'Dr. Michael Brown', specialization: 'Cardiologist', gender: 'Male' },
    { name: 'Dr. Sarah Davis', specialization: 'Pediatrician', gender: 'Female' },
    { name: 'Dr. Robert Green', specialization: 'Oncologist', gender: 'Male' },
    { name: 'Dr. Olivia Miller', specialization: 'Neurologist', gender: 'Female' },
    { name: 'Dr. Andrew Wilson', specialization: 'Gynecologist', gender: 'Male' },
    // Additional data
    { name: 'Dr. Linda White', specialization: 'Dentist', gender: 'Female' },
    { name: 'Dr. Brian Smith', specialization: 'Orthopedic', gender: 'Male' },
    { name: 'Dr. Jessica Johnson', specialization: 'Cardiologist', gender: 'Female' },
    { name: 'Dr. Christopher Brown', specialization: 'Pediatrician', gender: 'Male' },
    { name: 'Dr. Rachel Green', specialization: 'Oncologist', gender: 'Female' },
    { name: 'Dr. Daniel Miller', specialization: 'Neurologist', gender: 'Male' },
    { name: 'Dr. Sophia Wilson', specialization: 'Gynecologist', gender: 'Female' },
    // Add more doctors as needed
  ];
  

  const filteredDoctors =
    selectedSpecialist === 'All'
      ? doctors
      : doctors.filter((doctor) => doctor.specialization === selectedSpecialist);

  return (
    <div className="flex-row h-screen py-10 px-32">
      <div className="flex-1 flex flex-col ">
        {/* Div 1 */}
        <div className="flex items-start  p-4">
          <h1 className="text-4xl font-bold text-[#280a30]">Our Medical Specialists</h1>
        </div>

        {/* Div 2 */}
        <div className="flex-row overflow-x-scroll p-4 scrollbar-thin  custom-scrollbar-container scrollbar-thumb-rounded-[10px] scrollbar-track-rounded-[10px] scrollbar-w-[1px] scrollbar-thumb-[#cbcfd8] scrollbar-track-gray-100">
          <div className="flex flex-row space-y-2">
            {specialists.map((specialist, index) => (
              <div
                key={index}
                onClick={() => setSelectedSpecialist(specialist)}
                className={`rounded-full mx-[5px] px-4 py-[4px] cursor-pointer ${
                  specialist === selectedSpecialist
                    ? 'bg-[#280a30] text-white'
                    : 'bg-[#eaecee] text-[#280a30]'
                }`}
              >
                {specialist}
              </div>
            ))}
          </div>
        </div>
      

      {/* Div 3 */}
      <div className="flex overflow-x-auto p-4 scrollbar-thin  custom-scrollbar-container scrollbar-thumb-rounded-[10px] scrollbar-track-rounded-[10px] scrollbar-w-[1px] scrollbar-thumb-[#cbcfd8] scrollbar-track-gray-100">
        <div className="flex space-x-4 ">
          {filteredDoctors.map((doctor, index) => (
            <div key={index} className="max-w-xs w-[232px] rounded-lg overflow-hidden  px-4 py-8 bg-[#f2f4f9] flex flex-col items-center">
              {doctor.gender.toLowerCase() == 'female'?(
              <>
              <img
                src="/assets/doctor_female.png"
                className="w-[100%] h-[100%] object-cover mb-4"
              />
              </>):(
              <>
              <img
                src="/assets/doctor_male.png"
                className="w-[100%] h-[100%] object-cover mb-4"
              />
              </>
              )}
              
              <div className='py-[15px] bg-[#efd2f7] w-[100%] flex flex-col items-center rounded-[10px]'>
              <div className="text-md font-semibold mb-2 text-[#280a30]">{doctor.name}</div>
              <button 
              className="bg-[#280a30] text-[white] px-4 py-2 rounded-full text-[12px]"
              onClick={()=>router.push("/calendy")}
              >
                Get Appointment 
              </button>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default MedicalSpecialists;
