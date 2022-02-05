import { useState } from "react";
import Button from "../BasicUI/Button";
import Input from "../BasicUI/Input";
import { useNavigate } from "react-router-dom";
import HreflessLink from "../BasicUI/HreflessLink";
import signupUser from "../../fetch/auth/signupUser";
import useStore from "../../store/useStore";

const SignupPage = () => {

    const [inputs, setInputs] = useState({ username: "goodBoy55", password: "pa$$55" })
    const setIsUserAuthenticated = useStore(state => state.setIsUserAuthenticated);

    const navigate = useNavigate();

    const handleChangeInput = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const handleSumbitForm = e => {
        e.preventDefault();
        signupUser(inputs.username, inputs.password).then(result => setIsUserAuthenticated(result));
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