import date from "date-and-time";
import { today } from "./days";

/* 04:16+10:00 -> 4:16 */

const formatTimeStringForTaskState = (timeStr /* 16:00+01:00 */) => {
    // console.log({timeStr});
    if(!timeStr) return null;
    if (typeof timeStr !== "string") return console.error(`Expected string instead of ${typeof timeStr}`, { timeStr });
    const dateObj = new Date(date.format(today, "YYYY-MM-DD") + " " + timeStr);
    //console.log({ dateObj });
    return date.format(dateObj, "H:mm");
}

export default formatTimeStringForTaskState;