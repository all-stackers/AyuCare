import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/appContext";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const login = () => {
  const appContext = useContext(AppContext);
  const router = useRouter();

  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLogginIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    console.log("inside login page");
    if (appContext.isUserLoggedIn) {
      router.push("/home");
    }
  }, [appContext]);

  const onLoginClickHandler = async (event) => {
    event.preventDefault();
    setIsLoggingIn(true);
    try {
      const response = await axios.post("http://localhost:5000/login", {
        mobile_number: mobileNumber,
        password: password,
      });

      const data = response.data;

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_details", JSON.stringify(data.data));
      toast.success("Logged in successfully");
      appContext.setIsUserLoggedIn(true);
      appContext.setUserDetails(data.data);
    } catch (error) {
      const errorMessage = error.response.data.message;
      setMobileNumber("");
      setPassword("");
      toast.error(errorMessage);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      {!appContext.checkingIfLoggedIn ? (
        <div className={`flex flex-row h-full`}>
          {/* left container */}
          <div className={`w-[55%] box-border`}>
            <div className="">
              <div className="sally-img2">
                <img src="/SignupBg.png" alt="" />
              </div>
              <div className="sally-img1 mx-auto">
                <img src="/SignupGuy.png" alt="" />
              </div>
              <div className="w-[65%] mx-auto mt-[60px]">
                <div className="primary-title">Login to your account</div>
                <div className="secondary-title">
                  Your bridge to holistic well-being, seamlessly integrating
                  ancient Ayurvedic wisdom with cutting-edge modern healthcare
                  for personalized wellness solutions."
                </div>
              </div>
            </div>
          </div>

          {/* right container */}
          <div
            className={`flex flex-col min-w-[45%] px-[70px] py-[30px] min-h-full h-auto box-border border-l-[1px] text-dark1`}
          >
            <div className="text-[26px] font-Poppins mb-[45px] mt-[40px] text-center">
              Welcome Back!
            </div>

            <form
              className="mt-[40px] justify-center"
              action=""
              onSubmit={onLoginClickHandler}
            >
              <div className="flex flex-col gap-y-[25px]">
                <div className="flex flex-col justify-center items-center gap-y-[40px]">
                  {/* mobile number */}
                  <div className="flex flex-col w-[70%]">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Phone number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 box-border"
                      placeholder="9137XXXXXX"
                      pattern="[0-9]{10}"
                      required
                      value={mobileNumber}
                      onChange={(event) => {
                        setMobileNumber(event.target.value);
                      }}
                    />
                  </div>

                  {/* username */}
                  {/* <div className="flex w-[45%]">
                                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                        @
                                    </span>
                                    <input type="text" id="username" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="elonmusk"/>
                                </div> */}

                  {/* email */}
                  {/* <div className="w-[70%]">
                                    <label for="input-group-1" className="block mb-2 text-sm font-medium">Your Email</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                        </div>
                                        <input type="text" id="email" className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 " placeholder="name@gmail.com" required/>
                                    </div>
                                </div> */}
                  <div className="flex flex-col w-[70%]">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 box-border"
                      placeholder="•••••••••"
                      required
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              {!isLogginIn ? (
                <div className="flex flex-col gap-y-[20px] mt-[65px] items-center">
                  <button
                    className="flex flex-row gap-x-[10px] items-center outline-none text-white bg-purple-dark font-medium px-[22px] py-[8px] rounded-[5px] text-[14px] box-border"
                    type="submit"
                  >
                    Login
                  </button>
                  <div className="text-[14px]">
                    Don't have an account?
                    <span
                      className="text-purple-dark font-medium ml-[5px] cursor-pointer"
                      onClick={() => {
                        router.push("/signup");
                      }}
                    >
                      Sign Up
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-y-[20px] mt-[65px] items-center">
                  <ScaleLoader color="#7C3AED" />
                  Logging in...
                </div>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-y-[10px] items-center justify-center m-auto text-[14px] text-[#606060]">
          <ScaleLoader color="#7C3AED" />
          Hold on!
        </div>
      )}
    </>
  );
};

export default login;
