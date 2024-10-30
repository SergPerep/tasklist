import React, { ChangeEventHandler, KeyboardEventHandler } from "react";
import Icon from "../BasicUI/Icon";

type TimeInputArgs = {
    timeInputValue: string, 
    handleBlurTimeInput: () => void, 
    handleChangeTimeInput: ChangeEventHandler<HTMLInputElement>, 
    onKeyDown: KeyboardEventHandler
}

const TimeInput = ({ timeInputValue, handleBlurTimeInput, handleChangeTimeInput, onKeyDown }: TimeInputArgs) => {

    return <div className="timeinput">
        <Icon size="md" name="Clock" />
        <input
            type="text"
            placeholder="Set time"
            value={timeInputValue}
            onBlur={handleBlurTimeInput}
            onChange={handleChangeTimeInput}
            onKeyDown={onKeyDown}
        />
    </div>
}

export default TimeInput;
