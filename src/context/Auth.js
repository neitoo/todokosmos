import axios from "axios";
import config from "../config.js";
import { createContext, useState } from "react";
import AService from "../services/AService.js";

export const AuthClient = axios.create({
    baseURL: `${config.API_URL}/api`,
    withCredentials: true,
});

export const PrivateClient = axios.create({
    baseURL: `${config.API_URL}/api/a`
});

PrivateClient.interceptors.request.use(
    (config) => {

        const userId = AService.getUserID();
  
      if (userId) {
        config.headers['Authorization'] = `Bearer ${userId}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export const Auth = createContext({});

const AuthProvider = ({children}) =>{
    const [userData, setUserData] = useState({});
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [error,setError] = useState({});

    const handleProtectUser = () => {
        const userId = AService.getUserID();
        PrivateClient.post("/user", {id: userId})
        .then((res)=>{
            const {first_name, last_name, patronymic, director_id} = res.data;
            console.log(res.data);
            setUserData((prevData) => ({
                ...prevData,
                firstName: first_name,
                lastName: last_name,
                patronymic: patronymic,
                directorId: director_id
            }));
        })
        .catch((error)=>{
            console.error(error);
            throw error;
        });
    };

    const handleProtectTasks = () => {
        return PrivateClient.post("/all-tasks")
            .then((res) => {
                console.log(res.data);
                return res.data;
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    };

    const handleSignIn = (data) =>{
        AuthClient.post("/auth",data)
            .then((res) => {
                const {user_id} = res.data;
                AService.setUser(user_id);
                setIsUserLogged(true);
                setUserData({id: user_id});
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setError(error.response.data);
                } else {
                    setError({ error: "Сервер не отвечает." });
                }
            });
    };

    const handleLogOut = () => {
        setIsUserLogged(false);
        AService.deleteUser();
    };


    return (
        <Auth.Provider
            value={{
                isUserLogged,
                handleSignIn,
                handleProtectUser,
                handleLogOut,
                handleProtectTasks,
                error,
                userData
            }}
        >
        {(children)}
        </Auth.Provider>
    );
}

export default AuthProvider;