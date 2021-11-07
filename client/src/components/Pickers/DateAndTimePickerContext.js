import { createContext, useState } from "react";
import { today } from "../TodayTomorrowVars";
export const DateAndTimePickerContext = createContext();

export const DateAndTimePickerProvider = props => {
    // Date that is used to describe bundle of current dates in Calendar
    const [ancorDate, setAncorDate] = useState(new Date(today.getFullYear(), today.getMonth()));
    // State of celected date
    const [selectedDate, setSelectedDate] = useState(undefined); // Date object when defined
    const [considerTime, setConsiderTime] = useState(false);
    const [timeDisplay, setTimeDisplay] = useState(); // Text String for ex. 12:30
    const data = {
        ancorDate,
        setAncorDate,
        selectedDate,
        setSelectedDate,
        today,
        considerTime,
        setConsiderTime,
        timeDisplay,
        setTimeDisplay
    }

    return (
        <DateAndTimePickerContext.Provider value={data}>
            {props.children}
        </DateAndTimePickerContext.Provider>
    )
}