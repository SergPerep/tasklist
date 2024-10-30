import React from "react";
import ColorDisplay from "../BasicUI/ColorDisplay";
import Icon from "../BasicUI/Icon";

type MenuItemArgs = {
    iconName?: string, 
    colorStr?: string, 
    selected?: boolean, 
    children: any,
    onClick: () => void
}

const MenuItem = ({ iconName, colorStr, selected, children, onClick }: MenuItemArgs) => {
    return (
        <div className={`menu-item ${selected ? "selected" : ""}`} onClick={onClick}>

            {iconName && <div className="menu-icon-left">
                <Icon name={iconName} size="md" />
            </div>}

            {colorStr && <ColorDisplay colorStr={colorStr} size="md" />}
            <div className="menu-item-title">{children}</div>
            {selected && <div className="menu-icon-right">
                <Icon name="Check" size="md" />
            </div>}
        </div>
    )
}

export default MenuItem;