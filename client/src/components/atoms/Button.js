import clsx from "clsx";

const Button = props => {
    const { tag, design, type, value, form, disabled } = props;
    const isFormButton = tag === "button";
    const btnCls = clsx({
        "button": true,
        "outlined": design === "outlined" ? true : false
    });
    return (
        <>
            {isFormButton && <button disabled={disabled} type={type} form={form} value={value} className={btnCls} onClick={props.onClick}>
                {props.children}
            </button>}
            {!isFormButton && <div disabled={disabled} type={type} from={form} value={value} className={btnCls} onClick={props.onClick}>
                {props.children}
            </div>}

        </>
    )
}

export default Button;