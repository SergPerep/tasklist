import React, { ChangeEventHandler } from "react";

type InputArgs = {
    label: string,
    name?: string,
    value: string,
    placeholder?: string,
    onChange?: ChangeEventHandler,
    autoFocus?: boolean, 
    type?: string,
    maxLength?: number,
    minLength?: number
}

const Input = ({
    label,
    name,
    value,
    placeholder,
    onChange,
    autoFocus,
    type = "text",
    maxLength,
    minLength
}: InputArgs) => {
    return <div className="input-field">
        <label>{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
            maxLength={maxLength}
            minLength={minLength}
            placeholder={placeholder} />
    </div>
}

export default Input;