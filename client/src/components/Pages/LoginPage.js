import { useContext, useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { useNavigate } from "react-router-dom";
import HreflessLink from "../atoms/HreflessLink";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

const LoginPage = () => {
    const [inputs, setInputs] = useState({ username: "Bob", password: "BobTheBuilder1084" });
    const { loginUser } = useContext(AuthenticationContext);

    const navigate = useNavigate();

    const handleChangeInput = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const handleSumbitForm = (e) => {
        e.preventDefault();
        loginUser(inputs.username, inputs.password);
    }
    return (
        <div className="canvas">
            <div className="authentication">
                <h2>Login</h2>
                <form onSubmit={handleSumbitForm}>
                    <Input
                        label="Username"
                        name="username"
                        value={inputs.username}
                        placeholder="some-name"
                        onChange={handleChangeInput}
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={inputs.password}
                        placeholder="*****"
                        onChange={handleChangeInput}
                    />
                    <HreflessLink onClick={() => navigate("/signup")}>Create an account</HreflessLink>
                    <div className="button-container">
                        <Button type="submit" name="submit" tag="button">Login</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginPage;