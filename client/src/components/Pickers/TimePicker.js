import { useState, useContext } from "react";
import { DateAndTimePickerContext } from "./DateAndTimePickerContext";
import Icon from "../Icon";
import date from "date-and-time";
import { useClickOutside } from "../CustomHooks";

const TimePicker = () => {
    const { selectedDate, setSelectedDate, considerTime, setConsiderTime } = useContext(DateAndTimePickerContext);
    const [timeDisplay, setTimeDisplay] = useState(); // Text String for ex. 12:30
    const [openTimeInput, setOpenTimeInput] = useState(false);
    const [timeInput, setTimeInput] = useState("");
    const [showSave, setShowSave] = useState(false);

    const handleClickTimeDisplay = () => {
        if (!openTimeInput) {
            setOpenTimeInput(true);
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
        if (openTimeInput) {
            setOpenTimeInput(false); // hide time-input and show diplay
        }
        setTimeDisplay(date.format(newDate, "H:mm"));
    }

    const checkTimeFormat = (timeString) => {
        const regEx = /\d{1,2}:\d{1,2}(\s+)?([pP][mM]|[aA][mM])?/g;
        const isTimeString = regEx.test(timeString);
        console.log(isTimeString);
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
        setOpenTimeInput(false); // hide input and show display
        setShowSave(false); // hide «Save» button
        setTimeInput(""); // clear input

    });

    return (
        <div className="timepicker">
            <div className="time-display-container" ref={domRef} onClick={handleClickTimeDisplay}>
                {!openTimeInput &&
                    <div className="time-display" >
                        {!timeDisplay && <span className="placeholder">Add time</span>}
                        {timeDisplay && timeDisplay}
                    </div>
                }
                {openTimeInput &&
                    <div className="input-container">
                        <input type="text" value={timeInput} onChange={handleChangeTimeInput} placeholder="e.g. 14:30" size="" />
                        {showSave &&
                            <div className="time-display-button" onClick={handleClickSave}>Save</div>}
                    </div>
                }
            </div>
            {considerTime && !openTimeInput &&
                <div className="close-btn" onClick={handleClickClose}>
                    <Icon name="Close" size="sm" />
                </div>
            }

            <div className="time-menu"></div>
        </div>
    )
}

export default TimePicker;