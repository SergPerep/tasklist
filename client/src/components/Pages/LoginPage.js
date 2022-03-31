import { useState } from "react";
import Button from "../BasicUI/Button";
import Input from "../BasicUI/Input";
import { useNavigate } from "react-router-dom";
import HreflessLink from "../BasicUI/HreflessLink";
import loginUser from "../../fetch/auth/loginUser";
import useStore from "../../store/useStore";
import { ReactComponent as Logo } from "../../img/Logo-transparent.svg";
import DeveloperBar from "../DeveloperBar/DeveloperBar";

const LoginPage = () => {
    const [inputs, setInputs] = useState({ username: "", password: "" });
    const setIsUserAuthenticated = useStore(state => state.setIsUserAuthenticated);

    const navigate = useNavigate();

    const handleChangeInput = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        loginUser(inputs.username, inputs.password).then(result => setIsUserAuthenticated(result));
    }
    return (
        <div className="canvas">
            <div className="authentication">
                <div className="logo-container">
                    <Logo />
                </div>
                <h2>Login</h2>
                <form onSubmit={handleSubmitForm}>
                    <Input
                        label="Username"
                        name="username"
                        value={inputs.username}
                        placeholder=""
                        onChange={handleChangeInput}
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={inputs.password}
                        placeholder=""
                        onChange={handleChangeInput}
                    />
                    <HreflessLink onClick={e => {
                        e.preventDefault();
                        navigate("/signup")
                    }}>
                        Create an account
                    </HreflessLink>
                    <div className="button-container">
                        <Button type="submit" name="submit" tag="button">Login</Button>
                    </div>
                </form>
            </div>
            <DeveloperBar />
        </div>
    )
}
export default LoginPage;