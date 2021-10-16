import React, { useState } from "react"
import clsx from "clsx"

const Checkbox = (props) => {
    // const {status} = props;
    const [status, setStatus] = useState(props.status);
    const updateStatus = props.updateStatus;
    const checkboxCls = clsx({
        checkbox: true,
        checked: status
    });
    const handleCheckCheckbox = () => {
        updateStatus();
        setStatus(!status);
    }
    return (
        <div className={checkboxCls} onClick={handleCheckCheckbox}>
            <div className="circle"></div>
        </div>
    )
}

export default Checkbox;