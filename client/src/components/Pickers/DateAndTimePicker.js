import { useEffect, useState } from "react";
import date from "date-and-time";
import Icon from "../BasicUI/Icon";
import Calendar from "./Calendar";
import MenuItem from "../Menus/MenuItem";
import TimePicker from "./TimePicker";
import { useClickOutside } from "../CustomHooks";
import { today, tomorrow } from "../../utils/days";
import useStore from "../../store/useStore";

const DateAndTimePicker = () => {

    const pickedDateStr = useStore(state => state.pickedDateStr);
    const pickedDateObj = new Date(pickedDateStr);
    const setPickedDate = useStore(state => state.setPickedDate);
    const setPickedTimeStr = useStore(state => state.setPickedTimeStr);
    const setAnchorDate = useStore(state => state.setAnchorDate);

    const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);

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
    }

    const domNode = useClickOutside(() => {
        setIsDateMenuOpen(false); // close menu is click outside menu
    });

    useEffect(() => {
        setIsDateMenuOpen(false);
    }, [pickedDateStr]);

    useEffect(() => {
        setAnchorDate(pickedDateStr);
    }, [isDateMenuOpen])

    const handleClickToday = () => {
        setPickedDate(today);
    }

    const handleClickTomorrow = () => {
        setPickedDate(tomorrow);
    }

    const handleClickNoDate = () => {
        setPickedDate(null);
        setPickedTimeStr(null);
        setIsDateMenuOpen(false);
    }

    return (
        <div className="dt-picker">
            <div className="date-container" >
                <div className="date-display" onClick={handleClickDateDisplay}>
                    <Icon name="Today" size="sm" />
                    <div className="date-desc">
                        {formatDateForDisplay()}
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
                {pickedDateStr && <TimePicker />}
            </div>

        </div>
    )
}

export default DateAndTimePicker;