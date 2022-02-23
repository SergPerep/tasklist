import Icon from "../BasicUI/Icon";

const TimeInput = ({ timeInputValue, handleBlurTimeInput, handleChangeTimeInput }) => {

    return <div className="timeinput">
        <Icon size="md" name="Clock" />
        <input
            type="text"
            placeholder="Set time"
            value={timeInputValue}
            onBlur={handleBlurTimeInput}
            onChange={handleChangeTimeInput}
        />
    </div>
}

export default TimeInput;
