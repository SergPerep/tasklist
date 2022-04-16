import date from "date-and-time";
import { today, tomorrow } from "./days";

const formatDateString = (dateStr: string) => {
    if (typeof dateStr !== "string") return console.error("dateStr should be a string instead of " + typeof dateStr);
    const dateObj = new Date(dateStr);
    if (!dateObj) return;
    if (date.isSameDay(dateObj, today)) return "Today";
    if (date.isSameDay(dateObj, tomorrow)) return "Tomorrow";
    if (dateObj.getFullYear() !== today.getFullYear()) return date.format(dateObj, "DD MMM") + " " + dateObj.getFullYear();
    return date.format(dateObj, "DD MMM");
}

export default formatDateString;