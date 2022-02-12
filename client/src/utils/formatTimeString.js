import date from "date-and-time";
import { today } from "./days";
const formatTimeString = (timeStr /* 16:00+0100 */) => {
    if (typeof timeStr !== "string") return console.error(`timeStr should be a string instead of ${typeof timeStr}`)
    const dateObj = new Date(date.format(today, "YYYY-MM-DD") + " " + timeStr);
    console.log({ dateObj });
    return date.format(dateObj, "H:mm");
}

export default formatTimeString;