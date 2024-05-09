import { useContext, useEffect, useState } from "react";
import { Auth } from "../context/Auth";
import Header from "../components/Header";
import TasksList from "../components/TasksList";

const Main = () => {
    const { handleProtectUser, userData } = useContext(Auth);

    const [hasCalledProtect, setHasCalledProtect] = useState(false);

    useEffect(() => {
        if (!hasCalledProtect) {
            handleProtectUser();
            setHasCalledProtect(true);
        }
    }, [handleProtectUser, hasCalledProtect]);

    return (
        <>
            <Header userData={userData}/>
            <TasksList/>
        </>
    );
}

export default Main;