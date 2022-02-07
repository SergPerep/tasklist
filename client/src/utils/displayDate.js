import date from "date-and-time";
import { today, tomorrow } from "./days";

const displayDate = dateObj => {
    if (dateObj) {
        const format = "DD MMM";
        const todayString = date.format(today, format);
        const tomorrowString = date.format(tomorrow, format);
        const dateObjString = date.format(dateObj, format);
        if (todayString === dateObjString) {
            return "Today";
        } else if (tomorrowString === dateObjString) {
            return "Tomorrow";
        } else if (today.getFullYear() !== dateObj.getFullYear()) {
            return dateObjString + " " + dateObj.getFullYear();
        } else {
            return dateObjString;
        }
    }
}

export default displayDate;