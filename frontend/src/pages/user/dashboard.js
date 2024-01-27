import React, { useState, useEffect, useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BarGraph from "@/components/barchart";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { useRouter } from "next/router";
import { AppContext } from '@/context/appContext'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const healthTipsData = [
  { tip: "Drink plenty of water every day.", image: "/assets/water.png" },
  {
    tip: "Get at least 7-8 hours of sleep each night.",
    image: "/assets/sleep.png",
  },
  { tip: "Eat a balanced and nutritious diet.", image: "/assets/diet.png" },
  { tip: "Exercise regularly to stay active.", image: "/assets/exercise.png" },
  {
    tip: "Manage stress through relaxation techniques.",
    image: "/assets/stress.png",
  },
];

const calender = [
  {
    date: 26,
    day: "Fri",
  },
  {
    date: 27,
    day: "Sat",
  },
  {
    date: 28,
    day: "Sun",
  },
  {
    date: 29,
    day: "Mon",
  },
  {
    date: 30,
    day: "Tue",
  },
];

const appointments = [
  {
    name: "Dr. Friedric Ziccardi",
    doctorType: "Cardiologist",
    time: "17:00",
    date: "12/08",
  },
  {
    name: "Dr. Sarah Johnson",
    doctorType: "Dermatologist",
    time: "10:30",
    date: "12/09",
  },
  {
    name: "Dr. David Smith",
    doctorType: "Pediatrician",
    time: "14:45",
    date: "12/10",
  },
  {
    name: "Dr. Emily Brown",
    doctorType: "Psychiatrist",
    time: "11:15",
    date: "12/11",
  },
];

const home = () => {
  const [watchData, setWatchData] = useState(null);
  const router = useRouter();
  const appContext = useContext(AppContext)
  const [userDetails, setUserDetails] = useState({
    first_name: "All",
    last_name: "Stackers",
    age: 21,
    gender: "male",
    mobile_number: "9137357003",
    vata: "0",
    pitta: "0",
    kapha: "0"
  })

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000,
  };

  const formatDataForChart = (data) => {
    const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const chartLabels = [];
    const currentDate = new Date();
    let day = (currentDate.getDay() - 1) % 7;
    for (let i = 0; i < 7; i++) {
      chartLabels.push(labels[day]);
      day = (day + 1) % 7;
    }
    const values = Array(7).fill(0); // Initialize array with 7 zeroes for each day of the week
    data.forEach((entry) => {
      const startTime = new Date(parseInt(entry.startTimeMillis));
      const dayOfWeek = startTime.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
      values[dayOfWeek] += entry.value; // Add the step count to the corresponding day
    });

    return { labels: chartLabels, values: values };
  };

  const fetchData = async (dataTypeName) => {
    try {
      const response = await fetch(
        `https://v1.nocodeapi.com/jhenilparihar/fit/AIyMVUBTUSNFKymT/aggregatesDatasets?dataTypeName=${dataTypeName}`
      );
      const result = await response.json();

      // Process the response to format the data for the chart
      const formattedData = formatDataForChart(result[dataTypeName]);
      setWatchData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDoshas = async() => {

  }

  useEffect(() => {
    if (!appContext.checkingIfLoggedIn && !appContext.isUserLoggedIn) {
        router.push('/login')
    }
    else 
        setUserDetails(appContext.userDetails)
}, [appContext])

  useEffect(() => {
    fetchData("steps_count");
  }, []);

  const currentDateApp = new Date().getDate(); // Get current date

  console.log(userDetails)

  return (
    <div className="flex flex-row justify-evenly bg-[#f5f5f5] w-[100%] min-h-[calc(100vh-60px)] box-border overflow-hidden">
      <div className="flex-col w-[75%]">
        <div className="flex w-full">
          <div className="flex w-[50%] px-[10px] py-[20px]">
            <div className="flex flex-col bg-white rounded-[20px] px-[20px] py-[25px] box-border w-[100%] h-[400px] font-medium font-Lexend text-[18px] text-dark1">
              <div>Ayurvedic Dosha</div>
              <div className="flex mt-[10px] justify-around">
                <div className="w-[100px]">
                  {userDetails && <CircularProgressbar
                    value={userDetails.vata * 10}
                    text={`${userDetails.vata * 10}%`}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                      backgroundColor: "#fff",
                      textColor: "#514d4d",
                      pathColor: "#71a6b3",
                      trailColor: "#d4d4d4",
                      textSize: "16px",
                    })}
                  />}
                  <h1 className="w-full text-center text-[25px] font-bold">
                    Vatta
                  </h1>
                </div>
                <div className="w-[100px]">
                  {userDetails && <CircularProgressbar
                    value={userDetails.pitta * 10}
                    text={`${userDetails.pitta * 10}%`}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                      backgroundColor: "#fff",
                      textColor: "#514d4d",
                      pathColor: "#f13d16",
                      trailColor: "#d4d4d4",
                      textSize: "16px",
                    })}
                  />}
                  <h1 className="w-full text-center text-[25px] font-bold">
                    Pitta
                  </h1>
                </div>
                <div className="w-[100px]">
                  {userDetails && <CircularProgressbar
                    value={userDetails.kapha * 10}
                    text={`${userDetails.kapha * 10}%`}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                      backgroundColor: "#fff",
                      textColor: "#514d4d",
                      pathColor: "#5b8a1f",
                      trailColor: "#d4d4d4",
                      textSize: "16px",
                    })}
                  />}
                  <h1 className="w-full text-center text-[25px] font-bold">
                    Kapha
                  </h1>
                </div>
              </div>
              <p className="px-[5px] mt-[5px] text-[14px] font-light">
                Vata, Pitta, and Kapha are the three doshas or fundamental
                energies in Ayurveda that govern physiological and psychological
                functions in the body. Vata governs movement, Pitta regulates
                metabolism, and Kapha controls structure and stability in the
                body according to Ayurvedic principles.
              </p>
              <div className="flex mt-[20px] justify-around">
                <button
                  className="bg-gradient-to-r from-blue-300 to-blue-400 w-[150px] py-[5px] rounded-full"
                  onClick={() => {
                    router.push("/user/dosha-quiz");
                  }}
                >
                  Retake Quiz
                </button>
                <button className="bg-gradient-to-r from-blue-300 to-blue-400 w-[150px] py-[5px] rounded-full">
                  Ask AI
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-[50%] px-[10px] py-[20px]">
            <div className="flex flex-col bg-white rounded-[20px] px-[20px] py-[25px] box-border w-[100%] h-[400px] font-medium font-Lexend text-[18px] text-dark1">
              <div className="mb-[10px]">Health Analytics</div>

              <Tabs defaultValue="Steps Count" className="w-[400px]">
                <TabsList>
                  <TabsTrigger
                    onClick={() => fetchData("steps_count")}
                    value="Steps Count"
                  >
                    Steps Count
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => fetchData("calories_expended")}
                    value="Calories Burned"
                  >
                    Calories Burned
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => {
                      const labels = watchData.labels;
                      const values = [106, 115, 0, 0, 90, 120, 110];
                      setWatchData({ labels: labels, values: values });
                    }}
                    value="Heart Rate"
                  >
                    Heart Rate
                  </TabsTrigger>
                </TabsList>
                <div>
                  <TabsContent value="Steps Count">
                    <h1>Weekly Step Count</h1>
                  </TabsContent>
                  <TabsContent value="Calories Burned">
                    <h1>Weekly Calories Burned</h1>
                  </TabsContent>
                  <TabsContent value="Heart Rate">
                    <h1>Weekly Heart Rate</h1>
                  </TabsContent>
                  {watchData && <BarGraph data={watchData} />}
                </div>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex w-[300px] px-[10px] py-[20px]">
            <div className="flex flex-col items-center bg-[#05666c] rounded-[20px] px-[20px] py-[25px] box-border w-[100%] font-medium font-Lexend text-[18px] text-dark1">
              <div className="mx-auto text-white mb-[10px]">
                Calories Counter
              </div>
              <div className="">
                <SemiCircleProgressBar
                  percentage={33}
                  stroke={"#ffb84c"}
                  strokeWidth={15}
                  diameter={210}
                />
              </div>
              <div className="mt-[-70px] mb-[35px] h-[100px] w-[100px] rounded-[50%] bg-white border-[10px] border-[#107177] flex justify-center items-center">
                <div className="text-center">
                  <p className="text-[26px] font-light text-[#4e9196]">1280</p>
                  <p className="text-[14px] font-light">Calories</p>
                </div>
              </div>
              <button
                className="bg-white rounded-[20px] px-[10px] py-[5px] text-[15px] text-[#ffb84c]"
                onClick={() => {
                  router.push("/user/calories");
                }}
              >
                Add Calories
              </button>
            </div>
          </div>
          <div className="flex px-[10px] py-[20px]">
            <div className="flex flex-col bg-white rounded-[20px] px-[20px] py-[25px] box-border w-[100%] font-medium font-Lexend text-[18px] text-dark1">
              <div className="mb-[10px]">Tips</div>
              <div className="max-w-[500px] mx-auto">
                <Slider {...settings}>
                  {healthTipsData.map((data, index) => (
                    <div key={index} className="px-2 py-2">
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <img className="w-full h-full" src={`${data.image}`} />
                        <p className="text-lg font-semibold">{data.tip}</p>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col w-[25%] px-[10px] py-[20px] mr-[10px]">
        <div className="flex flex-col bg-white rounded-[20px] px-[20px] py-[25px] box-border w-[100%] h-full font-medium">
          <div className="flex flex-col items-center rounded-[15px] w-full">
            <img
              src="/assets/man2.png"
              alt="person"
              className="w-full rounded-[20px] object-cover"
            />
            <div className="flex bg-white justify-between rounded-[15px] py-[5px] w-[75%] px-[10px] box-border">
              <div>
                <div className="text-[15px] font-bold">Rupesh Raut</div>
                <div className="flex text-gray-600 px-[7px] gap-x-[8px] text-[13px]">
                  <div>21 years old </div>
                  <div>Male</div>
                </div>
              </div>
              <img className="h-[30px] my-auto" src="/assets/check.png"></img>
            </div>
          </div>
          <div className="flex-col space-y-[10px] text-gray-600 text-[14px]">
            <p>Phone no. 9004690126</p>
            <p>Last Appointment: 24 Jan, 2024</p>
          </div>
          <div className="mt-[30px]">
            <h1 className="">Appointments</h1>
            <div className="flex justify-around my-[20px]">
              {calender.map((item, index) => (
                <div
                  key={index}
                  className={`items-center rounded-[15px] w-[40px] border-[1px] py-[8px] px-[10px] ${
                    item.date === currentDateApp
                      ? "bg-purple-700 text-white"
                      : ""
                  }`}
                >
                  <p>{item.date}</p>
                  <p className="font-light">{item.day}</p>
                </div>
              ))}
            </div>
            <div className="mt-[15px]">
              {appointments.map((appointment, index) => (
                <div
                  key={index}
                  className="flex justify-between p-[5px] border-b-[2px] mt-[10px] my-[5px]"
                >
                  <div className="flex">
                    <span className="w-[5px] mr-[13px] h-[100%] bg-purple-900 text-purple-900">
                      i
                    </span>
                    <div>
                      <p>{appointment.name}</p>
                      <p className="text-gray-600 font-light">
                        {appointment.doctorType}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600">{appointment.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
