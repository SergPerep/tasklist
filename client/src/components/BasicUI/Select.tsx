import React from "react";
import { useState } from "react";
import Menu from "../Menus/Menu";

type SelectArgs = {
    selectList: SelectList, 
    label: string, 
    children: any
}

type SelectList = {
    title: string,
    iconName?: string,
    color?: string,
    selected: boolean,
    onClick: () => void
}[]

const Select = ({ selectList, label, children }: SelectArgs) => {
    const [openSelect, setOpenSelect] = useState(false);
    return <div className="select">
        <div className="select-label">{label}</div>
        <div className="select-field" onClick={() => setOpenSelect(!openSelect)}>
            <div className="select-display">{children}</div>
            {openSelect &&
                <div className="select-content">
                    <Menu menuList={selectList} onClickOutside={() => setOpenSelect(false)} />
                </div>
            }
        </div>
    </div>
}

export default Select;