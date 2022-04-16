import { ChangeEventHandler, useEffect, useState } from "react";
import Icon from "./Icon";
import zxcvbn from "zxcvbn";
import React from "react";

type PasswordInputArgs = {
    id: string,
    label: string,
    name: string,
    value: string,
    placeholder: string,
    onChange: ChangeEventHandler,
    autoFocus?: boolean,
    minLength?: number,
    maxLength?: number,
    inputId?: string,
    hasStrengthBar: boolean,
    hasShowPassword: boolean,
    setIsPasswordGood: (isIt: boolean) => void,
    goodScore: number
}

const PasswordInput = ({
    label,
    name,
    value,
    placeholder,
    onChange,
    autoFocus,
    minLength = 6,
    maxLength = 100,
    inputId,
    hasStrengthBar = false,
    hasShowPassword = true,
    setIsPasswordGood = () => { },
    goodScore = 3
}: PasswordInputArgs) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const result = hasStrengthBar ? zxcvbn(value || "") : null;
    const strengthNamesObj = {
        0: "Worst",
        1: "Bad",
        2: "Weak",
        3: "Good",
        4: "Strong"
    }

    const passScore = result ? result?.score : null;

    const feedbackTitleStr = passScore ? strengthNamesObj[passScore] : "";

    useEffect(() => {
        if (passScore) setIsPasswordGood(passScore >= goodScore);
    }, [result])

    const renderIcon = () => {
        if (!passScore) return
        if (passScore < 3) {
            return <Icon size="sm" name="Close" />
        } else {
            return <Icon size="sm" name="Check" />
        }
    }

    return <div className="input-field password-input-field">
        <label htmlFor={inputId}>{label}</label>
        <div className="input-container">
            <input
                id={inputId}
                type={isPasswordShown ? "text" : "password"}
                name={name}
                value={value}
                onChange={onChange}
                autoFocus={autoFocus}
                maxLength={maxLength}
                minLength={minLength}
                placeholder={placeholder} />
            {hasShowPassword &&
                <div className="show-password-btn" onClick={() => setIsPasswordShown(!isPasswordShown)}>
                    <Icon size="md" name={isPasswordShown ? "EyeOff" : "EyeOn"} />
                </div>
            }
            {hasStrengthBar && <>
                <label htmlFor="password-strength">Password strength</label>
                <meter id="password-strength" min="0" max="4" value={result?.score}></meter>

                {value &&
                    <div className="hint">
                        <div className="title">
                            <div className={`icon-container ${passScore ? "score-" + passScore : ""}`}>
                                {renderIcon()}
                            </div>
                            <span>{feedbackTitleStr}</span>
                        </div>
                        <div className="suggestion">{result?.feedback.suggestions}</div>
                    </div>
                }
            </>
            }
        </div>
    </div>
}

export default PasswordInput;