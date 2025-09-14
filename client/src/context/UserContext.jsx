import { Loader } from "@mantine/core";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const APP_URL = import.meta.env.VITE_APP_URL;

    const logout = () => {
        setUserInfo(null);
        localStorage.removeItem("token");
        navigate('/');
    }

    // const getUserInfo = async () => {
    //     try {
    //         const response = await fetch(`${APP_URL}/auth/refetch`, {
    //             method: 'GET',
    //             credentials: 'include'
    //         });
    //         if (!response.ok) {
    //             throw new Error(`HTTP Error! Status: ${response.status}`);
    //         }
    //     } catch (error) {
    //         console.log("Error in User Context", error);
    //     }
    // }

    // useEffect(() => {
    //     getUserInfo();
    // }, [])

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, logout }}>
            {children}
        </UserContext.Provider>
    );
}