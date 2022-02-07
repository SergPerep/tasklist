import React, { useState } from "react"
import clsx from "clsx"
import updateTaskStatus from "../../fetch/updateTaskStatus";

const Checkbox = ({ id, isCompleted }) => {
    const [status, setStatus] = useState(isCompleted);
    const checkboxCls = clsx({
        checkbox: true,
        checked: status
    });
    const handleCheckCheckbox = () => {
        updateTaskStatus(id);
        setStatus(!status);
    }
    return (
        <div className={checkboxCls} onClick={handleCheckCheckbox}>
            <div className="circle"></div>
        </div>
    )
}

export default Checkbox;