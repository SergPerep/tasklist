import { useState } from "react";
import Icon from "../BasicUI/Icon";
import { useClickOutside } from "../CustomHooks";
import useStore from "../../store/useStore";
import checkTimeFormat from "../../utils/checkTimeFormat";

const TimePicker = () => {

    const pickedDateStr = useStore(state => state.pickedDateStr);
    const setPickedDate = useStore(state => state.setPickedDate);
    const pickedTimeStr = useStore(state => state.pickedTimeStr);
    const setPickedTimeStr = useStore(state => state.setPickedTimeStr);
    const timeDisplay = useStore(state => state.timeDisplay);
    const setTimeDisplay = useStore(state => state.setTimeDisplay);

    const [isTimeInputOpen, setIsTimeInputOpen] = useState(false);
    const [timeInput, setTimeInput] = useState("");
    const [isSaveButtonShown, setIsSaveButtonShown] = useState(false);

    const handleClickTimeDisplay = () => {
        if (!isTimeInputOpen) {
            setIsTimeInputOpen(true);
        }
    }

    const handleClickSave = () => {
        // console.log({timeInput})
        setPickedTimeStr(timeInput);
        setIsSaveButtonShown(false); // hide «Save» button
        if (isTimeInputOpen) {
            setIsTimeInputOpen(false); // hide time-input and show diplay
        }
        setTimeDisplay(timeInput);
    }

    const handleChangeTimeInput = (e) => {
        setTimeInput(e.target.value);
        if (checkTimeFormat(e.target.value)) {
            setIsSaveButtonShown(true);
        } else {
            setIsSaveButtonShown(false);
        }
    }

    const handleClickClose = () => {
        setTimeDisplay(false);
        let newDate = new Date(pickedDateStr);
        newDate.setHours(0);
        newDate.setMinutes(0);
        setPickedDate(newDate);
        setPickedTimeStr(null);
    }


    const domRef = useClickOutside(() => {
        setIsTimeInputOpen(false); // hide input and show display
        setIsSaveButtonShown(false); // hide «Save» button
        setTimeInput(""); // clear input

    });

    return (
        <div className="timepicker">
            <div className="time-display-container" ref={domRef} onClick={handleClickTimeDisplay}>
                {!isTimeInputOpen &&
                    <div className="time-display" >
                        {!timeDisplay && <span className="placeholder">Add time</span>}
                        {timeDisplay && timeDisplay}
                    </div>
                }
                {isTimeInputOpen &&
                    <div className="input-container">
                        <input type="text" value={timeInput} onChange={handleChangeTimeInput} placeholder="e.g. 14:30" size="" />
                        {isSaveButtonShown &&
                            <div className="time-display-button" onClick={handleClickSave}>Save</div>}
                    </div>
                }
            </div>
            {pickedTimeStr && !isTimeInputOpen &&
                <div className="close-btn" onClick={handleClickClose}>
                    <Icon name="Close" size="sm" />
                </div>
            }

            <div className="time-menu"></div>
        </div>
    )
}

export default TimePicker;