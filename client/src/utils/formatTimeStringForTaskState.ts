import date from "date-and-time";
import { WrongTypeError } from "./customErrors";

/* HH:mm:ssZZ -> H:mm */

const formatTimeStringForTaskState = (timeStr: string /* 16:00+01:00 */) => {
    if (!timeStr) return null;
    if (typeof timeStr !== "string") throw new WrongTypeError("string", timeStr, { timeStr });

    return date.transform(timeStr, "HH:mm:ssZZ", "H:mm");
}

export default formatTimeStringForTaskState;