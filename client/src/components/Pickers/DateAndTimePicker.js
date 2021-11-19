import { useContext, useEffect, useState } from "react";
import date from "date-and-time";
import Icon from "../Icon";
import Calendar from "./Calendar";
import { DateAndTimePickerContext } from "./DateAndTimePickerContext";
import MenuItem from "../Menus/MenuItem";
import TimePicker from "./TimePicker";
import { useClickOutside } from "../CustomHooks";

const DateAndTimePicker = () => {
    const { selectedDate, setSelectedDate, today, considerTime, setConsiderTime, setAncorDate } = useContext(DateAndTimePickerContext);
    const tomorrow = date.addDays(today, 1);
    const [openDateMenu, setOpenDateMenu] = useState(false);

    // Defines title for date display 
    const displayDate = () => {
        if (!selectedDate) {
            // if selectedDate is undefined
            return <span className="placeholder">Schedule</span>;
        } else if (selectedDate.getFullYear() !== today.getFullYear()) {
            // if selectedDate is another year
            return date.format(selectedDate, "DD MMM YYYY");
        } else if (date.isSameDay(selectedDate, today)) {
            // if selectedDate is today
            return "Today";
        } else if (date.isSameDay(selectedDate, tomorrow)) {
            // if selectedDate is tomorrow
            return "Tomorrow";
        } else {
            // if selectedDate is this year but not today or tomorrow
            return date.format(selectedDate, "DD MMM");
        }

    }

    // Click on date display
    const handleClickDateDisplay = () => {
        setOpenDateMenu(true); // open menu if click on time-display
    }

    // Click outside of menu
    const domNode = useClickOutside(() => {
        setOpenDateMenu(false); // close menu is click outside menu
    });

    // When selectedDate is updated
    useEffect(() => {
        setOpenDateMenu(false); // close menu when selectedDate is updated
    }, [selectedDate]);

    useEffect(()=>{
        if (selectedDate) {
            setAncorDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth()));
        } else {
            setAncorDate(new Date(today.getFullYear(), today.getMonth()));
        }
        
    }, [openDateMenu])

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

    // Click on «Today»
    const handleClickToday = () => {
        if (considerTime) {
            const newDate = mergeDateAndTime(today, selectedDate);
            setSelectedDate(newDate);
        } else {
            setSelectedDate(today);
        }
    }

    // Click on «Tomorrow»
    const handleClickTomorrow = () => {
        if (considerTime) {
            const newDate = mergeDateAndTime(tomorrow, selectedDate);
            setSelectedDate(newDate);
        } else {
            setSelectedDate(tomorrow);
        }
    }

    // Click on «No date»
    const handleClickNoDate = () => {
        setSelectedDate(undefined);
        setConsiderTime(false);
        setOpenDateMenu(false); // close menu if no-date is selected
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
                {openDateMenu &&
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