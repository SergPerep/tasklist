import React, { MouseEventHandler } from "react";
import Icon from "../BasicUI/Icon";

type DefaultSectionItemArgs = {
    leftIcon: string | undefined | null,
    onClick: MouseEventHandler,
    selected: boolean,
    count: number | undefined | null,
    children: any
}


const DefaultSectionItem = ({ leftIcon, onClick, selected, count, children }: DefaultSectionItemArgs) => {

    count = count || 0;
    leftIcon = leftIcon || null;

    return <div className={`sidenav-item ${selected ? "selected" : ""}`} onClick={onClick}>
        {leftIcon &&
            <div className="sidenav-icon left-icon">
                <Icon name={leftIcon} size={"md"} />
            </div>
        }
        <div className="sidenav-desc">
            {children}
        </div>
        {count > 0 &&
            <div className="sidenav-count">
                {count}
            </div>
        }
    </div>
}

export default DefaultSectionItem;