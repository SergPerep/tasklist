import { useContext, useEffect, useState } from "react";
import date from "date-and-time";
import Icon from "../BasicUI/Icon";
import Calendar from "./Calendar";
import { DateAndTimePickerContext } from "./DateAndTimePickerContext";
import MenuItem from "../Menus/MenuItem";
import TimePicker from "./TimePicker";
import { useClickOutside } from "../CustomHooks";
import { today, tomorrow } from "../../utils/days";

const DateAndTimePicker = () => {
    const { selectedDate, setSelectedDate, considerTime, setConsiderTime, setAncorDate } = useContext(DateAndTimePickerContext);
    const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);

    // Defines title for date display 
    const displayDate = () => {
        if (!selectedDate) return <span className="placeholder">Schedule</span>
        // if selectedDate is another year
        if (selectedDate.getFullYear() !== today.getFullYear()) return date.format(selectedDate, "DD MMM YYYY");
        // if selectedDate is today
        if (date.isSameDay(selectedDate, today)) return "Today";
        // if selectedDate is tomorrow
        if (date.isSameDay(selectedDate, tomorrow)) return "Tomorrow";
        // if selectedDate is this year but not today or tomorrow
        return date.format(selectedDate, "DD MMM");
    }

    const handleClickDateDisplay = () => {
        setIsDateMenuOpen(true); // open menu if click on time-display
    }

    const domNode = useClickOutside(() => {
        setIsDateMenuOpen(false); // close menu is click outside menu
    });

    useEffect(() => {
        setIsDateMenuOpen(false);
    }, [selectedDate]);

    useEffect(() => {
        if (selectedDate) return setAncorDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth()));
        setAncorDate(new Date(today.getFullYear(), today.getMonth()));
    }, [isDateMenuOpen])

    // Takes two date objects and returns another –
    // sets hours and minutes of second date object for first date object
    const mergeDateAndTime = (dateDateObj, timeDateObj) => {
        let dateDateAndTimeObj = new Date(dateDateObj);
        const hours = timeDateObj.getHours();
        const minutes = timeDateObj.getMinutes();
        dateDateAndTimeObj.setHours(hours);
        dateDateAndTimeObj.setMinutes(minutes);
        return dateDateAndTimeObj
    }

    const handleClickToday = () => {
        if (!considerTime) return setSelectedDate(today);
        const newDate = mergeDateAndTime(today, selectedDate);
        setSelectedDate(newDate);
    }

    const handleClickTomorrow = () => {
        if (!considerTime) return setSelectedDate(tomorrow);
        const newDate = mergeDateAndTime(tomorrow, selectedDate);
        setSelectedDate(newDate);
    }

    const handleClickNoDate = () => {
        setSelectedDate(undefined);
        setConsiderTime(false);
        setIsDateMenuOpen(false);
    }

    return (
        <div className="dt-picker">
            <div className="date-container" >
                <div className="date-display" onClick={handleClickDateDisplay}>
                    <Icon name="Today" size="sm" />
                    <div className="date-desc">
                        {displayDate()}
                    </div>
                </div>
                {isDateMenuOpen &&
                    <div className="date-menu" ref={domNode}>
                        <div className="button-container">
                            <MenuItem onClick={handleClickToday} iconName="Today">Today</MenuItem>
                            <MenuItem onClick={handleClickTomorrow} iconName="Tomorrow">Tomorrow</MenuItem>
                            <MenuItem onClick={handleClickNoDate} iconName="No">No date</MenuItem>
                        </div>
                        <Calendar />
                    </div>}
            </div>

            <div className="time-container">
                {selectedDate && <TimePicker />}
            </div>

        </div>
    )
}

export default DateAndTimePicker;