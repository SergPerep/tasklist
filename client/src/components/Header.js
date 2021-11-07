import date from "date-and-time";
import { today, tomorrow } from "./TodayTomorrowVars";

const Header = props => {
    const { title } = props;
    const getCorDate = () => {
        if (typeof title === "string") {
            if (title.toLowerCase() === "today") {
                return date.format(today, "DD MMM");
            } else {
                if (title.toLowerCase() === "tomorrow") {
                    return date.format(tomorrow, "DD MMM");
                }
            }
        }
    }
    const corDate = getCorDate();
    return (
        <div className="header">
            <h1>{title}</h1>
            {corDate && <span>{corDate}</span>}
            <div className="button-container">{props.children}</div>
        </div>
    )
}

export default Header;