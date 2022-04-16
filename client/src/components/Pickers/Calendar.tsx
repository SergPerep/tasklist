import date from "date-and-time";
import clsx from "clsx";
import Icon from "../BasicUI/Icon";
import makeDaysToDisplay from "../../utils/makeDaysToDisplay";
import { useActions, useStore } from "src/store";
import React from "react";

type CalendarArgs = {
    selectedDateStr: string,
    setSelectedDateObj: (dateObj: Date) => void
}

const Calendar = ({ selectedDateStr, setSelectedDateObj }: CalendarArgs) => {
    const anchorDateObj = useStore(state => state.anchorDateObj);
    const setAnchorDate = useActions(actions => actions.setAnchorDate);

    const daysToDisplay = makeDaysToDisplay(anchorDateObj, selectedDateStr);

    // Just names of days of the week for render
    const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

    // Handles going a month back
    const handleClickBack = () => {
        setAnchorDate(date.addMonths(anchorDateObj, -1));
    }

    // Handles going a month further
    const handleClickFurther = () => {
        setAnchorDate(date.addMonths(anchorDateObj, 1));
    }

    // Handles click on a date to select
    const handleClickDay = (dateObj: Date) => {
        setSelectedDateObj(dateObj);
    }

    return (
        <div className="calendar">
            <div className="calendar-controls">
                <div className="month-back" onClick={handleClickBack}><Icon name="AngleLeft" size="md" /></div>
                <div className="month-display">{date.format(anchorDateObj, "MMMM YYYY")}</div>
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
                    return <div className={dayCls} key={index} onClick={() => { handleClickDay(day.dateObj) }}>
                        <div className="select-area">
                            {day.dateObj.getDate()}
                        </div>
                    </div>
                })}
            </div>

        </div>
    )
}

export default Calendar;