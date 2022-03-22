import Button from "../BasicUI/Button";
import { useNavigate } from "react-router-dom";
import { ReactComponent as UFOKidnapping } from "../../img/UFOKidnapping.svg";

const NotFoundPage = () => {
    
    const navigate = useNavigate();

    return (
        <div className="canvas not-found">
            <div className="not-found-container">
                <UFOKidnapping />
                <div className="content-wrapper">
                    <h1>Page does not exist</h1>
                    <p>Check the request or return to home page</p>
                    <Button onClick={() => { navigate("/") }}>To home page</Button>
                </div>
            </div>
        </div>
    )
}
export default NotFoundPage;