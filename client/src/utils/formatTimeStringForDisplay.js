import date from "date-and-time";
import { today } from "./days";
const formatTimeStringForDisplay = (timeStr /* 16:00+0100 */) => {
    if(!timeStr) return null;
    if (typeof timeStr !== "string") return console.error(`Expected string instead of ${typeof timeStr}`, { timeStr });
    const dateObj = new Date(date.format(today, "YYYY-MM-DD") + " " + timeStr);
    //console.log({ dateObj });
    return date.format(dateObj, "H:mm");
}

export default formatTimeStringForDisplay;