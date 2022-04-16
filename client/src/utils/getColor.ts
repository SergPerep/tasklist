import { Color } from "src/types";
import CHARCOAL_COLOR from "./CHARCOAL_COLOR";

const getColor = (colors: Color[], colorId: number | null) => {
    const selectedColor = colors
        .find(color => color.id === colorId)
    return selectedColor ? selectedColor : CHARCOAL_COLOR;
}

export default getColor;