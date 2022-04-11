import clsx from "clsx";
import React from "react";

type ButtonArgs = {
    children: any,
    tag?: string,
    design?: string,
    type?: "button" | "submit" | "reset" | undefined,
    value?: string,
    form?: string,
    disabled: boolean,
    name?: string,
    onClick: () => void,
    onKeyDown?: () => void,
    reference?: any
}

const Button = ({
    children,
    tag,
    design,
    type,
    value,
    form,
    disabled,
    name,
    onClick,
    onKeyDown,
    reference
}: ButtonArgs) => {
    const isFormButton = tag === "button";
    const btnCls = clsx({
        "button": true,
        "outlined": design === "outlined" ? true : false,
        "transparent": design === "transparent",
        "disabled": disabled === true ? true : false
    });
    const tabIndex = disabled !== true ? 0 : undefined;
    return (
        <>
            {isFormButton &&
                <button
                    disabled={disabled}
                    name={name}
                    type={type}
                    form={form}
                    value={value}
                    className={btnCls}
                    onClick={onClick}
                    onKeyDown={onKeyDown}
                    ref={reference}
                    tabIndex={tabIndex}>
                    {children}
                </button>}
            {!isFormButton &&
                <div
                    className={btnCls}
                    onClick={onClick}
                    onKeyDown={onKeyDown}
                    ref={reference}
                    tabIndex={tabIndex}>
                    {children}
                </div>}

        </>
    )
}

export default Button;