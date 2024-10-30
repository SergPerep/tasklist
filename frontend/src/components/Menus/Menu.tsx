import React from "react";
import { useClickOutside } from "../CustomHooks";
import MenuItem from "./MenuItem";
import { MenuList } from "../../types";

type MenuArgs = {
    menuList: MenuList,
    onClickOutside?: () => void
}

const Menu = ({ menuList, onClickOutside }: MenuArgs) => {
    const domNode = useClickOutside(onClickOutside);
    return (
        <div className="menu" ref={domNode}>
            {menuList.map((item, index) => <MenuItem
                iconName={item.iconName}
                colorStr={item.colorStr}
                selected={item.selected}
                onClick={item.onClick}
                key={index}>
                {item.title}
            </MenuItem>)}
        </div>)
}

export default Menu;