import date from "date-and-time";
import Icon from "./Icon";
import Menu from "./Menus/Menu";
import { today, tomorrow } from "./TodayTomorrowVars";
import { useClickOutside } from "./CustomHooks";
import { useState } from "react";

const Header = props => {
    const { menuList } = props;
    const title = props.children;
    const [openMenu, setOpenMenu] = useState(false);
    const domNode = useClickOutside(() => {
        setOpenMenu(false);
    });
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
            <div className="header-text-group">
                <h1>{title}</h1>
                {corDate && <span>{corDate}</span>}
            </div>
            {menuList &&
                <div className="more" onClick={() => { setOpenMenu(!openMenu) }}>
                    <div className="more-icon">
                        <Icon size="md" name="More" />
                    </div>
                    {openMenu &&
                        <div className="more-content" ref={domNode}>
                            <Menu menuList={menuList} />
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Header;