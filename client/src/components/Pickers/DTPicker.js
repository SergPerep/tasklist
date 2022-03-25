import { useEffect, useState, useRef } from "react";
import date from "date-and-time";
import Icon from "../BasicUI/Icon";
import Button from "../BasicUI/Button";
import Calendar from "./Calendar";
import MenuItem from "../Menus/MenuItem";
import { useClickOutside } from "../CustomHooks";
import { today, tomorrow } from "../../utils/days";
import useStore from "../../store/useStore";
import formatUserInputTimeString from "../../utils/formatUserInputTimeString";
import TimeInput from "./TimeInput";

const DTPicker = () => {
    const pickedDateStr = useStore(state => state.pickedDateStr);
    const setPickedDateStr = useStore(state => state.setPickedDateStr);
    const pickedDateObj = new Date(pickedDateStr);
    const setPickedDateObj = (dateObj) => {
        if (!dateObj) return setPickedDateStr(null);
        if (dateObj instanceof Date) return setPickedDateStr(date.format(dateObj, "YYYY-MM-DD"))
        return;
    }

    const pickedTimeStr = useStore(state => state.pickedTimeStr);
    const setPickedTimeStr = useStore(state => state.setPickedTimeStr);

    const [selectedTimeStr, setSelectedTimeStr] = useState("");
    const [selectedDateStr, setSelectedDateStr] = useState("");
    const setSelectedDateObj = (dateObj) => {
        if (!dateObj) return setSelectedDateStr("");
        if (dateObj instanceof Date) return setSelectedDateStr(date.format(dateObj, "YYYY-MM-DD"));
        return;
    }

    const setAnchorDate = useStore(state => state.setAnchorDate);

    const isDateMenuOpen = useStore(state => state.isDateMenuOpen);
    const setIsDateMenuOpen = useStore(state => state.setIsDateMenuOpen);

    const [timeInputValue, setTimeInputValue] = useState("");

    useEffect(() => {
        setTimeInputValue(pickedTimeStr);
    }, [pickedTimeStr])

    // Defines title for date display 
    const formatDateForDisplay = () => {
        if (!pickedDateStr) return <span className="placeholder">Schedule</span>
        // if pickedDateStr is another year
        if (pickedDateObj.getFullYear() !== today.getFullYear()) return date.format(pickedDateObj, "DD MMM YYYY");
        // if pickedDateStr is today
        if (date.isSameDay(pickedDateObj, today)) return "Today";
        // if pickedDateStr is tomorrow
        if (date.isSameDay(pickedDateObj, tomorrow)) return "Tomorrow";
        // if pickedDateStr is this year but not today or tomorrow
        return date.format(pickedDateObj, "DD MMM");
    }

    const handleClickDateDisplay = () => {
        setIsDateMenuOpen(true); // open menu if click on time-display
        setSelectedDateStr(pickedDateStr);
        if (pickedDateStr) {
            setSelectedTimeStr(pickedTimeStr);
            setTimeInputValue(pickedTimeStr || "");
        } else {
            setSelectedTimeStr("");
            setTimeInputValue("");
        }
    }

    const handleEnterDateDisplay = e => {
        if (e.key !== "Enter") return;
        handleClickDateDisplay();
        e.preventDefault();
    }

    const domNode = useClickOutside(() => {
        setIsDateMenuOpen(false); // close menu is click outside menu
    });

    useEffect(() => {
        setAnchorDate(pickedDateStr);
    }, [isDateMenuOpen])

    const handleClickToday = () => {
        setPickedDateObj(today);
        setPickedTimeStr("");
        setIsDateMenuOpen(false);

    }

    const handleClickTomorrow = () => {
        setPickedDateObj(tomorrow);
        setPickedTimeStr("");
        setIsDateMenuOpen(false);
    }

    const handleClickNoDate = () => {
        setPickedDateStr("");
        setPickedTimeStr("");
        setIsDateMenuOpen(false);
    }

    const handleChangeTimeInput = e => setTimeInputValue(e.target.value)

    const handleBlurTimeInput = () => {
        if (!timeInputValue) return setSelectedTimeStr("");
        const formattedInput = formatUserInputTimeString(timeInputValue);
        if (!formattedInput) return setSelectedTimeStr("");
        setTimeInputValue(formattedInput);
        setSelectedTimeStr(formattedInput);
    }

    const handleClickOk = () => {
        if (!selectedTimeStr) setPickedTimeStr("");
        if (date.isValid(selectedTimeStr, "H:mm")) setPickedTimeStr(date.transform(selectedTimeStr, "H:mm", "HH:mm"));
        setPickedDateStr(selectedDateStr);
        setIsDateMenuOpen(false);
    }

    const handleEnterOk = e => {
        if (e.key !== "Enter") return;
        handleClickOk();
        e.preventDefault();
    }

    const handleClickCancel = () => {
        setIsDateMenuOpen(false);
    }

    const handleEnterCancel = e => {
        if (e.key !== "Enter") return;
        handleClickCancel();
        e.preventDefault();
    }

    const okBtn = useRef(null);

    const handleEnterTimeInput = e => {
        if (e.key !== "Enter") return;
        okBtn.current.focus();
        e.preventDefault();
    }

    return <div className="dt-picker">
        <div className="date-container" >
            <div className="date-display" onClick={handleClickDateDisplay} onKeyDown={handleEnterDateDisplay} tabIndex={0}>
                <Icon name="Today" size="sm" />
                <div className="date-desc">
                    {formatDateForDisplay()}
                    {pickedTimeStr && pickedDateStr && " " + pickedTimeStr}
                </div>
            </div>
            {isDateMenuOpen &&
                <div className="date-menu" ref={domNode}>
                    <div className="button-container">
                        <MenuItem onClick={handleClickToday} iconName="Today">Today</MenuItem>
                        <MenuItem onClick={handleClickTomorrow} iconName="Tomorrow">Tomorrow</MenuItem>
                        <MenuItem onClick={handleClickNoDate} iconName="No">No date</MenuItem>
                    </div>
                    <Calendar
                        selectedDateStr={selectedDateStr}
                        setSelectedDateObj={setSelectedDateObj}
                    />
                    {selectedDateStr &&
                        <TimeInput
                            timeInputValue={timeInputValue}
                            handleChangeTimeInput={handleChangeTimeInput}
                            handleBlurTimeInput={handleBlurTimeInput}
                            onKeyDown={handleEnterTimeInput}
                        />
                    }
                    <div className="button-group">
                        <Button design="outlined" onClick={handleClickCancel} onKeyDown={handleEnterCancel}>Cancel</Button>
                        <Button onClick={handleClickOk} onKeyDown={handleEnterOk} reference={okBtn}>Ok</Button>
                    </div>
                </div>}
        </div>
    </div>
}

export default DTPicker;