const AService = () => {

    let inMemoryUserID = null;

    const getUserID = () => inMemoryUserID;

    const setUser = (user_id) => {
        inMemoryUserID = user_id;
    };

    const deleteUser = () => {
        inMemoryUserID = null;
    };

    return {getUserID,setUser,deleteUser};
}

export default AService();