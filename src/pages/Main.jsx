import { useContext, useEffect, useState } from "react";
import { Auth } from "../context/Auth";
import Header from "../components/Header";
import TasksList from "../components/TasksList";

const Main = () => {
    const { handleProtectUser, handleProtectUsers, userData } = useContext(Auth);

    const [hasCalledProtect, setHasCalledProtect] = useState(false);
    const [protectedUsers, setProtectedUsers] = useState([]);

    useEffect(() => {
        if (!hasCalledProtect) {
            handleProtectUser();
            handleProtectUsers()
                .then(usersList => {
                    setProtectedUsers(usersList); 
                })
                .catch(error => {
                    console.error("Ошибка:", error);
                });
            setHasCalledProtect(true);
        }
    }, [handleProtectUser, hasCalledProtect,handleProtectUsers]);

    return (
        <>
            <Header userData={userData} users={protectedUsers}/>
            <TasksList users={protectedUsers}/>
        </>
    );
}

export default Main;