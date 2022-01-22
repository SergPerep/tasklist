import { useContext, useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { useNavigate } from "react-router-dom";
import HreflessLink from "../atoms/HreflessLink";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

const SignupPage = () => {

    const [inputs, setInputs] = useState({ username: "goodBoy55", password: "pa$$55" })

    const { signupUser } = useContext(AuthenticationContext);

    const navigate = useNavigate();

    const handleChangeInput = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const handleSumbitForm = e => {
        e.preventDefault();
        signupUser(inputs.username, inputs.password);
    }
    return <div className="canvas">
        <div className="authentication">
            <h2>Sign up</h2>
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
                <HreflessLink onClick={() => navigate("/login")}>Already have an account?</HreflessLink>
                <div className="button-container">
                    <Button type="submit" tag="button" name="submit">Sign up</Button>
                </div>
            </form>
        </div>
    </div>
}

export default SignupPage;