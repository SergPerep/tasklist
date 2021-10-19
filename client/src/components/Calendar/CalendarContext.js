import { createContext, useState } from "react";

export const CalendarContext = createContext();

export const CalendarProvider = props => {
    const today = new Date();
    // Date that is used to describe bundle of current dates in Calendar
    const [ancorDate, setAncorDate] = useState(new Date(today.getFullYear(), today.getMonth()));
    // State of celected date
    const [selectedDate, setSelectedDate] = useState(today); // Date object when defined
    const [chosenDate, setChosenDate] = useState();
    
    const data = {
        ancorDate,
        setAncorDate,
        selectedDate,
        setSelectedDate,
        today,
        chosenDate,
        setChosenDate
    }

    // console.log(data);
    return (
        <CalendarContext.Provider value={data}>
            {props.children}
        </CalendarContext.Provider>
    )
}