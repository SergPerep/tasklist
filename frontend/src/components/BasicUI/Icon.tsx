// Names for icons are in LineIcons.css

import React from "react";

type IconArgs = {
    size: string,
    name: string
}

const Icon = ({ size, name }: IconArgs) => {
    const isTodayMd = name === "Today" && size === "md";
    return (
        <>
            {isTodayMd && <div className={`line-icon icon-${name}-${size} icon-${size}`}>
                <div className="icon-today">{(new Date()).getDate()}</div>
            </div>}
            {!isTodayMd &&
                <div className={`line-icon icon-${name}-${size} icon-${size}`}></div>
            }
        </>
    )
}

export default Icon;
