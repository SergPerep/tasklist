import clsx from "clsx";

const Button = ({ children, tag, design, type, value, form, disabled, name, onClick, onKeyDown, reference }) => {
    const isFormButton = tag === "button";
    const btnCls = clsx({
        "button": true,
        "outlined": design === "outlined" ? true : false,
        "transparent": design === "transparent"
    });
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
                    tabIndex={0}>
                    {children}
                </button>}
            {!isFormButton &&
                <div
                    disabled={disabled}
                    name={name}
                    type={type}
                    form={form}
                    value={value}
                    className={btnCls}
                    onClick={onClick}
                    onKeyDown={onKeyDown}
                    ref={reference}
                    tabIndex={0}>
                    {children}
                </div>}

        </>
    )
}

export default Button;