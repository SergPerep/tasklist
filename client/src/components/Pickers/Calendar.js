import date from "date-and-time";
import clsx from "clsx";
import { useContext } from "react";
import { DateAndTimePickerContext } from "./DateAndTimePickerContext";
import Icon from "../Icon";
import { today } from "../TodayTomorrowVars";

const Calendar = () => {
    const contextValue = useContext(DateAndTimePickerContext);
    const { ancorDate, setAncorDate, selectedDate, setSelectedDate } = contextValue;

    // Makes an array that will be used to render calendar grid
    const rollOutDates = (ancorDate, selectedDate) => {
        // Trying to find the start of calendar grid
        const year = ancorDate.getFullYear();
        const monthIndex = ancorDate.getMonth();
        const firstDayOfMonth = new Date(year, monthIndex, 1);
        const diff = firstDayOfMonth.getDay() - 1;
        let startOfCalGrid;
        if (diff > 0) {
            // This is tuesday, wedsday, thursday, friday or saterday
            // Get last monday
            startOfCalGrid = date.addDays(firstDayOfMonth, -diff);
        } else if (diff === 0) {
            // This is monday
            startOfCalGrid = firstDayOfMonth;
        } else if (diff < 0) {
            // This is sunday
            // Get last monday
            startOfCalGrid = date.addDays(firstDayOfMonth, -6);
        }

        // Make an array of dates starting with «the start of calendar grid»
        let arr = [];
        for (let i = 0; i < 42; i++) {
            const aDate = date.addDays(startOfCalGrid, i)
            const isToday = date.isSameDay(aDate, today);
            const isThisMonth = aDate.getMonth() === monthIndex;
            // Is this date selected?
            let isSelected;
            if (selectedDate) {
                isSelected = date.isSameDay(aDate, selectedDate);
            } else {
                // If undefined then false
                isSelected = false;
            }
            arr.push({
                aDate, // Date object
                isToday, // Boolean
                isThisMonth, // Boolean
                isSelected // Boolean
            });
        }
        return arr;
    }

    const dateRow = rollOutDates(ancorDate, selectedDate);
    // const [dateRow, setDateRow] = useState(rollOutDates(ancorDate));

    // Handles going a month back
    const handleClickBack = () => {
        setAncorDate(date.addMonths(ancorDate, -1));
    }

    // Handles going a month further
    const handleClickFurther = () => {
        setAncorDate(date.addMonths(ancorDate, 1));
    }

    // Handles click on a date to select
    const handleClickDay = (aDate) => {
        setSelectedDate(aDate);
    }

    // Just names of days of the week for render
    const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

    return (
        <div className="calendar">
            <div className="calendar-controls">
                <div className="month-back" onClick={handleClickBack}><Icon name="AngleLeft" size="md" /></div>
                <div className="month-display">{date.format(ancorDate, "MMMM YYYY")}</div>
                <div className="month-further" onClick={handleClickFurther}><Icon name="AngleRight" size="md" /></div>
            </div>
            <div className="calendar-weekdays">
                {weekDays.map((weekDay, index) => <div key={index}>{weekDay}</div>)}
            </div>
            <div className="calendar-days">
                {dateRow.map((day, index) => {
                    const dayCls = clsx({
                        "calendar-cell": true,
                        "today": day.isToday,
                        "this-month": day.isThisMonth,
                        "selected": day.isSelected
                    });
                    return <div className={dayCls} key={index} onClick={() => { handleClickDay(day.aDate) }}>
                        <div className="select-area">
                            {day.aDate.getDate()}
                        </div>
                    </div>
                })}
            </div>

        </div>
    )
}

export default Calendar;