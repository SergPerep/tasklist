import { useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { useNavigate } from "react-router-dom";
import HreflessLink from "../atoms/HreflessLink";

const SignupPage = () => {

    const [inputs, setInputs] = useState({ username: "goodBoy55", password: "pa$$55" })

    const navigate = useNavigate();

    const handleChangeInput = () => {

    }

    const handleSumbitForm = () => {

    }
    return <div className="canvas">
        <div className="authentication">
            <h2>Sign up</h2>
            <form onSubmit={handleSumbitForm}>
                <Input
                    label="Username"
                    value={inputs.username}
                    placeholder="some-name"
                    onChange={handleChangeInput}
                />
                <Input
                    label="Password"
                    type="password"
                    value={inputs.password}
                    placeholder="*****"
                    onChange={handleChangeInput}
                />
                <HreflessLink onClick={() => navigate("/login")}>Already have an account?</HreflessLink>
                <div className="button-container">
                    <Button>Sign up</Button>
                </div>
            </form>
        </div>
    </div>
}

export default SignupPage;