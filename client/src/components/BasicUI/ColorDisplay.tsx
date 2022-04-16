import React from "react";
import CHARCOAL_COLOR from "src/utils/CHARCOAL_COLOR";

type ColorDisplayArgs = {
    colorStr: string | undefined,
    size: "md" | "sm"
}
const ColorDisplay = ({ colorStr, size }: ColorDisplayArgs) => {
    colorStr = colorStr || CHARCOAL_COLOR.value;
    return <div className={`color-display ${size}`}>
        <div className="color-spot" style={{backgroundColor: colorStr}}></div>
    </div>
}

export default ColorDisplay;