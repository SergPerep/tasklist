import date from "date-and-time";
import clsx from "clsx";
import { useContext } from "react";
import { DateAndTimePickerContext } from "./DateAndTimePickerContext";
import Icon from "../BasicUI/Icon";
import makeDaysToDisplay from "../../utils/makeDaysToDisplay";

const Calendar = () => {
    const contextValue = useContext(DateAndTimePickerContext);
    const { ancorDate, setAncorDate, selectedDate, setSelectedDate } = contextValue;
    const daysToDisplay = makeDaysToDisplay(ancorDate, selectedDate);

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
                {daysToDisplay.map((day, index) => {
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