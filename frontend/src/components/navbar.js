import { AppContext } from "@/context/appContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    appContext.isUserLoggedIn
  );
  const [pathname, setPathname] = useState(router.pathname);

  useEffect(() => {
    setIsUserLoggedIn(appContext.isUserLoggedIn);
  }, [appContext]);

  useEffect(() => {
    setPathname(router.pathname.split("/").pop());
  }, [router]);

  const onLoginClickHandler = () => {
    if (router.pathname !== "/login") router.push("/login");
  };

  const onSignupClickHandler = () => {
    if (router.pathname !== "/signup") router.push("/signup");
  };

  const onLogoutClickHandler = () => {
    localStorage.removeItem("access_token");
    appContext.setIsUserLoggedIn(false);
    router.push("/login");
  };

  if (router.pathname.includes("/doctor/")) {
    return (
      <nav className="w-full py-2 px-8 flex justify-between items-center border-b-[1px] border-[#e4e4e7]">
        <div className="flex items-center">
          <img src="/assets/logo.svg" alt="Logo" className="w-8 h-8 mr-2" />
          <span className="text-lg font-semibold">AyuCare</span>
        </div>
        <button
          className="text-white bg-gray-900 hover:bg-gray-600 px-8 py-2 rounded-sm "
          onClick={null}
        >
          Logout
        </button>
      </nav>
    );
  }
  return (
    <nav className="w-full h-[60px] flex flex-row items-center box-border border-b-[1px] border-[#e4e4e7] px-[30px] text-dark1">
      <div
        className="flex flex-row gap-x-[15px] font-medium font-Lexend text-[20px] text-dark1 cursor-pointer"
        onClick={() => {
          router.push("/user/dashboard");
        }}
      >
        <img src="/assets/logo.svg" alt="logo" className="w-[16px]" />
        AyuCare
      </div>

      {pathname !== "user" && pathname !== "doctor" && (
        <div className="flex flex-row box-border ml-auto gap-x-[20px]">
          {!isUserLoggedIn ? (
            <>
              <button
                className="flex flex-row gap-x-[10px] items-center outline-none text-purple-dark border-[1px] border-purple-dark font-semibold px-[22px] py-[8px] rounded-[5px] text-[14px] box-border"
                onClick={onLoginClickHandler}
              >
                Login
              </button>

              <button
                className="flex flex-row gap-x-[10px] items-center outline-none text-white bg-purple-dark font-medium px-[22px] py-[8px] rounded-[5px] text-[14px] box-border"
                onClick={onSignupClickHandler}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-row items-center gap-x-[30px] mr-[30px] cursor-pointer">
                <div
                  className={`hover:text-purple-dark ${
                    pathname == "/aiSolutions" && "text-purple-dark"
                  }`}
                  onClick={() => {
                    router.push("/aiSolutions");
                  }}
                >
                  AI Solutions
                </div>
                <div
                  className={`hover:text-purple-dark ${
                    pathname == "/ayurlearn/modules" && "text-purple-dark"
                  }`}
                  onClick={() => {
                    router.push("/ayurlearn/modules");
                  }}
                >
                  Ayurvedic Learning
                </div>
                <div
                  className={`hover:text-purple-dark`}
                  onClick={() => {
                    router.push("/user/expert");
                  }}
                >
                  Talk to Expert
                </div>
              </div>

              <button
                className="flex flex-row gap-x-[10px] items-center outline-none text-white bg-purple-dark font-medium px-[22px] py-[8px] rounded-[5px] text-[14px] box-border"
                onClick={onLogoutClickHandler}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
