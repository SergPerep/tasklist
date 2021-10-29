import { createContext, useState } from "react";

export const DateAndTimePickerContext = createContext();

export const DateAndTimePickerProvider = props => {
    const today = new Date();
    // Date that is used to describe bundle of current dates in Calendar
    const [ancorDate, setAncorDate] = useState(new Date(today.getFullYear(), today.getMonth()));
    // State of celected date
    const [selectedDate, setSelectedDate] = useState(undefined); // Date object when defined
    const [considerTime, setConsiderTime] = useState(false);
    const data = {
        ancorDate,
        setAncorDate,
        selectedDate,
        setSelectedDate,
        today,
        considerTime,
        setConsiderTime
    }

    // console.log(data);
    return (
        <DateAndTimePickerContext.Provider value={data}>
            {props.children}
        </DateAndTimePickerContext.Provider>
    )
}