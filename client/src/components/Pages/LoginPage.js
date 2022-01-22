import { useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { useNavigate } from "react-router-dom";
import HreflessLink from "../atoms/HreflessLink";

const LoginPage = () => {
    const [inputs, setInputs] = useState({ username: "goodBoy55", password: "pa$$55" })

    const navigate = useNavigate();

    const handleChangeInput = () => {

    }

    const handleSumbitForm = () => {

    }
    return (
        <div className="canvas">
            <div className="authentication">
                <h2>Login</h2>
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
                    <HreflessLink onClick={() => navigate("/signup")}>Create an account</HreflessLink>
                    <div className="button-container">
                    <Button>Login</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginPage;