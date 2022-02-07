import date from "date-and-time";
import { today } from "./days";

// Makes an array that will be used to render calendar grid
const makeDaysToDisplay = (anchorDate, selectedDate) => {
    // Trying to find the start of calendar grid
    const year = anchorDate.getFullYear();
    const monthIndex = anchorDate.getMonth();
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
        const isSelected = selectedDate ? date.isSameDay(aDate, selectedDate) : false;
        arr.push({
            aDate, // Date object
            isToday, // Boolean
            isThisMonth, // Boolean
            isSelected // Boolean
        });
    }
    return arr;
}

export default makeDaysToDisplay;