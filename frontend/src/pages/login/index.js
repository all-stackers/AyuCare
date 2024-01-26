import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/appContext";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import SelectUser from "@/components/selectUser/selectUser";

const Login = () => {
  const appContext = useContext(AppContext);
  const router = useRouter();

  const [user, setUser] = useState("1");

  const onContinueLoginClickHandler = () => {
    if (user == "1") {
      router.push("/login/user");
    } else if (user == "2") {
      router.push("/login/doctor");
    }
  };

  useEffect(() => {
    if (!appContext.checkingIfLoggedIn && appContext.isUserLoggedIn) {
      router.push("/home");
    }
  }, [appContext]);

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
            <SelectUser
              user={user}
              setUser={setUser}
              onContinueRegistrationClickHandler={onContinueLoginClickHandler}
              continueTo="Login"
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

export default Login;
