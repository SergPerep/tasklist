import date from "date-and-time";
import Icon from "./BasicUI/Icon";
import Menu from "./Menus/Menu";
import { today, tomorrow } from "../utils/days";
import { useClickOutside } from "./CustomHooks";
import { useState } from "react";
import React from "react";
import { MenuList } from "src/types";

type HeaderArgs = {
    menuList: MenuList,
    children: any
}

const Header = ({ menuList, children }: HeaderArgs) => {
    const title = children;
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
        return null;
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