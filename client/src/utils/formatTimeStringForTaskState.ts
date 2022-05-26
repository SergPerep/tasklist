import date from "date-and-time";
import { WrongTypeError } from "./customErrors";

/* HH:mm:ssZZ -> H:mm */

const formatTimeStringForTaskState = (timeStr: string /* 16:00+01:00 */, nowObj = new Date()) => {
    if (!nowObj) return null;
    if (nowObj instanceof Date === false) throw new WrongTypeError("Date", nowObj, { nowObj });
    
    if (!timeStr) return null;
    if (typeof timeStr !== "string") throw new WrongTypeError("string", timeStr, { timeStr });
    
    const dateStr = date.format(nowObj, "YYYY-MM-DD");
    const dateAndTimeStr =`${dateStr} ${timeStr}`;
    
    return date.transform(dateAndTimeStr, "YYYY-MM-DD HH:mm:ssZZ", "H:mm");
}

export default formatTimeStringForTaskState;