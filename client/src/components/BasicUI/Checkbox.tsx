import React, { useState } from "react"
import clsx from "clsx"
import toggleTaskCompletion from "../../fetch/toggleTaskCompletion";

type CheckboxArgs = {
    id: number,
    isCompleted: boolean
}

const Checkbox = ({ id, isCompleted }: CheckboxArgs) => {
    const [status, setStatus] = useState(isCompleted);
    const checkboxCls = clsx({
        checkbox: true,
        checked: status
    });
    const handleCheckCheckbox = () => {
        toggleTaskCompletion(id);
        setStatus(!status);
    }
    return (
        <div className={checkboxCls} onClick={handleCheckCheckbox}>
            <div className="circle"></div>
        </div>
    )
}

export default Checkbox;