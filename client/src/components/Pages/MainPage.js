import { useContext } from "react";
import Button from "../atoms/Button";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

const MainPage = () => {
    const { logoutUser } = useContext(AuthenticationContext);
    const handleClickLogout = () => {
        logoutUser();
    }
    return <>
        <h1>Main page</h1>
        <Button design="outlined" onClick={handleClickLogout}>Logout</Button>
    </>
}

export default MainPage;