import React from "react";
import { useClickOutside } from "../CustomHooks";
import MenuItem from "./MenuItem";

type MenuArgs = {
    menuList: MenuList,
    onClickOutside: () => void
}

type MenuList = {
    title: string,
    iconName?: string,
    color?: string,
    selected: boolean,
    onClick: () => void
}[]

const Menu = ({ menuList, onClickOutside }: MenuArgs) => {
    const domNode = useClickOutside(onClickOutside);
    return (
        <div className="menu" ref={domNode}>
            {menuList.map((item, index) => <MenuItem
                iconName={item.iconName}
                color={item.color}
                selected={item.selected}
                onClick={item.onClick}
                key={index}>
                {item.title}
            </MenuItem>)}
        </div>)
}

export default Menu;