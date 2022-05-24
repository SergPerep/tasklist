import { Color } from "src/types";
import COAL_COLOR from "./COAL_COLOR";

const getColor = (colors: Color[], colorId: number | null) => {
    const selectedColor = colors
        .find(color => color.id === colorId)
    return selectedColor ? selectedColor : COAL_COLOR;
}

export default getColor;