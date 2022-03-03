import { useState } from "react";
import Button from "../BasicUI/Button";
import Input from "../BasicUI/Input";
import PasswordInput from "../BasicUI/PasswordInput";
import { useNavigate } from "react-router-dom";
import HreflessLink from "../BasicUI/HreflessLink";
import signupUser from "../../fetch/auth/signupUser";
import useStore from "../../store/useStore";
import checkWhearherUsernameExists from "../../fetch/checkWeatherUsernameExists";
import validateUsername from "../../utils/validateUsername";
import Spinner from "../BasicUI/Spinner";
import Icon from "../BasicUI/Icon";
import { ReactComponent as Logo } from "../../img/Logo-transparent.svg";

const SignupPage = () => {

    const [inputs, setInputs] = useState({ username: "", password: "" })
    const setIsUserAuthenticated = useStore(state => state.setIsUserAuthenticated);
    const [isPasswordGood, setIsPasswordGood] = useState(false);
    const navigate = useNavigate();

    const [validationMessage, setValidationMessage] = useState(null);

    const [isUsernameExists, setIsUsernameExists] = useState(false);
    const [isUsernameCorrect, setIsUsernameCorrect] = useState(false);
    const isUsernameGood = !isUsernameExists && isUsernameCorrect;

    const isSignUpActive = isPasswordGood && isUsernameGood;
    // let isUsernameExists = false;
    // useEffect(async () => {
    //     const userName = inputs.username;
    //     if (!validateUsername(userName)) return setIsUsernameGood(false);
    //     isUsernameExists = await checkWhearherUsernameExists(userName);
    //     setIsUsernameGood(!isUsernameExists);
    // }, [inputs.username])

    // const handleChangeInput = e => {
    //     setInputs({ ...inputs, [e.target.name]: e.target.value });
    // }

    const handleChangeUsernameInput = async (e) => {
        try {
            const userName = e.target.value;
            setInputs({ ...inputs, username: userName });
            setIsUsernameExists(null);

            const validationResult = validateUsername(userName);
            setValidationMessage(validationResult.message);

            if (!validationResult.state) return setIsUsernameCorrect(false);
            setIsUsernameCorrect(true);

            const isExist = await checkWhearherUsernameExists(userName);
            if (!isExist) return setIsUsernameExists(false);
            setIsUsernameExists(true);
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleChangePasswordInput = e => {
        setInputs({ ...inputs, password: e.target.value });
    }

    const handleSumbitForm = e => {
        e.preventDefault();
        signupUser(inputs.username, inputs.password).then(result => setIsUserAuthenticated(result));
    }
    return <div className="canvas">
        <div className="authentication">
            <div className="logo-container">
                <Logo />
            </div>
            <h2>Sign up</h2>
            <form onSubmit={handleSumbitForm}>
                <Input
                    label="Username"
                    name="username"
                    value={inputs.username}
                    placeholder=""
                    onChange={handleChangeUsernameInput}
                />
                <div className="hint">

                    {isUsernameExists === null && !isUsernameCorrect && inputs.username.length > 0 && <>
                        <div className="icon-container close-icon">
                            <Icon size="sm" name={"Close"} />
                        </div>
                        <span>{validationMessage}</span>
                    </>}

                    {isUsernameExists === null && isUsernameCorrect && <>
                        <Spinner size="sm" />
                        <span>Checking username...</span>
                    </>}

                    {isUsernameExists === true && isUsernameCorrect && <>
                        <div className="icon-container close-icon">
                            <Icon size="sm" name={"Close"} />
                        </div>
                        <span>Such username already exists</span>
                    </>}

                    {isUsernameExists === false && isUsernameCorrect && <>
                        <div className="icon-container check-icon">
                            <Icon size="sm" name={"Check"} />
                        </div>
                        <span>You can use this username</span>
                    </>}

                    {/*<span className="message-username">{!isUsernameGood ? "! Such username already exists" : "You can use this username"}</span>*/}
                </div>

                <PasswordInput
                    id="password"
                    label="Password"
                    name="password"
                    value={inputs.password}
                    placeholder=""
                    hasStrengthBar={true}
                    hasShowPassword={true}
                    onChange={handleChangePasswordInput}
                    setIsPasswordGood={setIsPasswordGood}
                    goodScore={3}
                />
                <HreflessLink onClick={e => {
                    e.preventDefault();
                    navigate("/login")
                }}>
                    Already have an account?
                </HreflessLink>
                <div className="button-container">
                    <Button type="submit" tag="button" name="submit" disabled={!isSignUpActive}>Sign up</Button>
                </div>
            </form>
        </div>
    </div>
}

export default SignupPage;