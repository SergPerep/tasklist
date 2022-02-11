import { useState } from "react";
import Icon from "../BasicUI/Icon";
import date from "date-and-time";
import { useClickOutside } from "../CustomHooks";
import useStore from "../../store/useStore";

const TimePicker = () => {

    const selectedDate = useStore(state => state.selectedDate);
    const setSelectedDate = useStore(state => state.setSelectedDate);
    const considerTime = useStore(state => state.considerTime);
    const setConsiderTime = useStore(state => state.setConsiderTime);
    const timeDisplay = useStore(state => state.timeDisplay);
    const setTimeDisplay = useStore(state => state.setTimeDisplay);

    const [isTimeInputOpen, setIsTimeInputOpen] = useState(false);
    const [timeInput, setTimeInput] = useState("");
    const [showSave, setShowSave] = useState(false);

    const handleClickTimeDisplay = () => {
        if (!isTimeInputOpen) {
            setIsTimeInputOpen(true);
        }
    }

    const handleClickSave = () => {
        const timeArr = timeInput.trim().split(":", 2);
        timeArr.map(x => parseInt(x, 10));
        const [hours, minutes] = timeArr;
        let newDate = new Date(selectedDate);
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        setSelectedDate(newDate);
        setConsiderTime(true); // make time readable
        setShowSave(false); // hide «Save» button
        if (isTimeInputOpen) {
            setIsTimeInputOpen(false); // hide time-input and show diplay
        }
        setTimeDisplay(date.format(newDate, "H:mm"));
    }

    const checkTimeFormat = (timeString) => {
        const regEx = /\d{1,2}:\d{1,2}(\s+)?([pP][mM]|[aA][mM])?/g;
        const isTimeString = regEx.test(timeString);
        return isTimeString;
    }

    const handleChangeTimeInput = (e) => {
        setTimeInput(e.target.value);
        if (checkTimeFormat(e.target.value)) {
            setShowSave(true);
        } else {
            setShowSave(false);
        }
    }

    const handleClickClose = () => {
        setTimeDisplay(false);
        let newDate = new Date(selectedDate);
        newDate.setHours(0);
        newDate.setMinutes(0);
        setSelectedDate(newDate);
        setConsiderTime(false);
    }


    const domRef = useClickOutside(() => {
        setIsTimeInputOpen(false); // hide input and show display
        setShowSave(false); // hide «Save» button
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
                        {showSave &&
                            <div className="time-display-button" onClick={handleClickSave}>Save</div>}
                    </div>
                }
            </div>
            {considerTime && !isTimeInputOpen &&
                <div className="close-btn" onClick={handleClickClose}>
                    <Icon name="Close" size="sm" />
                </div>
            }

            <div className="time-menu"></div>
        </div>
    )
}

export default TimePicker;