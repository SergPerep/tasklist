import Button from "../BasicUI/Button";
import { useNavigate } from "react-router-dom";
import { ReactComponent as UFOKidnapping } from "../../img/UFOKidnapping.svg";
import HomeTopNav from "../HomeTopNav";
import DeveloperBar from "../DeveloperBar/DeveloperBar";

const NotFoundPage = () => {


    const navigate = useNavigate();
    
    const handleClickToHome = () => navigate("/");
    const handleEnterToHome = e => {
        if (e.key !== "Enter") return;
        handleClickToHome();
    }

    return (
        <div className="canvas not-found">
            <HomeTopNav />
            <div className="not-found-container">
                <UFOKidnapping />
                <div className="content-wrapper">
                    <h1>Page does not exist</h1>
                    <p>Check the request or return to home page</p>
                    <Button
                        onClick={handleClickToHome}
                        onKeyDown={handleEnterToHome}
                    >
                        To home page
                    </Button>
                </div>
            </div>
            <DeveloperBar />
        </div>
    )
}
export default NotFoundPage;