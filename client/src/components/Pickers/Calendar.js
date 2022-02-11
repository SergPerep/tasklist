import date from "date-and-time";
import clsx from "clsx";
import Icon from "../BasicUI/Icon";
import makeDaysToDisplay from "../../utils/makeDaysToDisplay";
import useStore from "../../store/useStore";

const Calendar = () => {
    const anchorDate = useStore(state => state.anchorDate);
    const setAnchorDate = useStore(state => state.setAnchorDate);
    const selectedDate = useStore(state => state.selectedDate);
    const setSelectedDate = useStore(state => state.setSelectedDate);
    
    const daysToDisplay = makeDaysToDisplay(anchorDate, selectedDate);

    // Handles going a month back
    const handleClickBack = () => {
        setAnchorDate(date.addMonths(anchorDate, -1));
    }

    // Handles going a month further
    const handleClickFurther = () => {
        setAnchorDate(date.addMonths(anchorDate, 1));
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
                <div className="month-display">{date.format(anchorDate, "MMMM YYYY")}</div>
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