import date from "date-and-time";
import { today } from "./days";

// Makes an array that will be used to render calendar grid
const makeDaysToDisplay = (anchorDateObj: Date, pickedDateStr: string) => {
    const pickedDateObj = new Date(pickedDateStr);
    // Trying to find the start of calendar grid
    const year = anchorDateObj.getFullYear();
    const monthIndex = anchorDateObj.getMonth();
    const firstDayOfMonth = new Date(year, monthIndex, 1);
    const diff = firstDayOfMonth.getDay() - 1;
    let startOfCalGrid: Date;
    if (diff > 0) {
        // This is tuesday, wednesday, thursday, friday or saturday
        // Get last monday
        startOfCalGrid = date.addDays(firstDayOfMonth, -diff);
    } else if (diff === 0) {
        // This is monday
        startOfCalGrid = firstDayOfMonth;
    } else {
        // This is sunday
        // Get last monday
        startOfCalGrid = date.addDays(firstDayOfMonth, -6);
    }

    // Make an array of dates starting with «the start of calendar grid»
    let arr = [];
    for (let i = 0; i < 42; i++) {
        const dateObj = date.addDays(startOfCalGrid, i)
        const isToday = date.isSameDay(dateObj, today);
        const isThisMonth = dateObj.getMonth() === monthIndex;
        // Is this date selected?
        const isSelected = pickedDateObj ? date.isSameDay(dateObj, pickedDateObj) : false;
        arr.push({
            dateObj, // Date object
            isToday, // Boolean
            isThisMonth, // Boolean
            isSelected // Boolean
        });
    }
    return arr;
}

export default makeDaysToDisplay;