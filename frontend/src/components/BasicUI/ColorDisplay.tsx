import React from "react";
import COAL_COLOR from "src/utils/COAL_COLOR";

type ColorDisplayArgs = {
    colorStr: string | undefined,
    size: "md" | "sm"
}
const ColorDisplay = ({ colorStr, size }: ColorDisplayArgs) => {
    colorStr = colorStr || COAL_COLOR.value;
    return <div className={`color-display ${size}`}>
        <div className="color-spot" style={{backgroundColor: colorStr}}></div>
    </div>
}

export default ColorDisplay;