import clsx from "clsx";

const Button = props => {
    const { tag, design, type, value, form, disabled, name, onClick } = props;
    const isFormButton = tag === "button";
    const btnCls = clsx({
        "button": true,
        "outlined": design === "outlined" ? true : false,
        "transparent": design === "transparent"
    });
    return (
        <>
            {isFormButton && <button disabled={disabled} name={name} type={type} form={form} value={value} className={btnCls} onClick={onClick}>
                {props.children}
            </button>}
            {!isFormButton && <div disabled={disabled} name={name} type={type} form={form} value={value} className={btnCls} onClick={onClick}>
                {props.children}
            </div>}

        </>
    )
}

export default Button;