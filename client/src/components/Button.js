import clsx from "clsx";

const Button = props => {
    const btnCls = clsx({
        "button": true,
        "outlined": false
    });
 return (
     <div className={btnCls} onClick={props.onClick}>{props.children}</div>
 )
}

export default Button;