import { set } from "lodash";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
    const [checkingIfLoggedIn, setCheckingIfLoggedIn] = useState(true)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [userDetails, setUserDetails] = useState(null)

    const fetchUserDetails = (token) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://localhost:5000/getUser", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("user details: ", result.data)
            setUserDetails(result.data)
        })
        .catch(error => console.log('error', error));
    }
    
    useEffect(() => {
        const token = localStorage.getItem('access_token')
        console.log("token: ", token)

        if (token && token.length > 0) {

            setIsUserLoggedIn(true)
            // setUserDetails(JSON.parse(localStorage.getItem('user_details')))
            fetchUserDetails(token)
            setCheckingIfLoggedIn(false)
        }
        else {
            setIsUserLoggedIn(false)
            setCheckingIfLoggedIn(false)
        }
    }, [])

    const providerValue = {
        isUserLoggedIn,
        checkingIfLoggedIn,
        user,
        userDetails,
        setIsUserLoggedIn,
        setUserDetails
    }

    return (
        <AppContext.Provider value={providerValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider