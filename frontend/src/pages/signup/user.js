import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/appContext";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import SignupForm from "@/components/signup/signupForm";
import SelectUser from "@/components/selectUser/selectUser";

const signup = () => {
  const appContext = useContext(AppContext);
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const [isSigningup, setIsSigninup] = useState(false);

  useEffect(() => {
    console.log("inside Signup page");
    if (appContext.isUserLoggedIn) {
      router.push("/home");
    }
  }, [appContext]);

  const onSignupClickHandler = async (event) => {
    event.preventDefault();
    setIsSigninup(true);

    if (password.length < 5 || password.length > 20) {
      toast.error("Password should be between 8 and 20 characters");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        first_name: firstName,
        last_name: lastName,
        age: age,
        gender: gender,
        mobile_number: mobileNumber,
        password: password,
      });

      const data = response.data;

      localStorage.setItem("access_token", data.access_token);
      toast.success("Signed up successfully");
      appContext.setIsUserLoggedIn(true);
    } catch (error) {
      const errorMessage = error.response.data.message;
      setMobileNumber("");
      setPassword("");
      toast.error(errorMessage);
    } finally {
      setIsSigninup(false);
    }
  };

  const user = 1;

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
                <div className="primary-title">Signup to your new account</div>
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
              Let's create an account !
            </div>
            <SignupForm
              firstName={firstName}
              lastName={lastName}
              gender={gender}
              mobileNumber={mobileNumber}
              password={password}
              isSigningup={isSigningup}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setAge={setAge}
              setGender={setGender}
              setMobileNumber={setMobileNumber}
              setPassword={setPassword}
              onSignupClickHandler={onSignupClickHandler}
            />
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

export default signup;
