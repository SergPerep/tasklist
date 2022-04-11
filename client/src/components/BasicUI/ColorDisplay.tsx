import React from "react";

type ColorDisplayArgs = {
    color: string,
    size: string
}
const ColorDisplay = ({ color, size }: ColorDisplayArgs) => {
    return <div className={`color-display ${size}`}>
        <div className="color-spot" style={{backgroundColor: color}}></div>
    </div>
}

export default ColorDisplay;