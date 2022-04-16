import { action, Action } from "easy-peasy";
import { Color } from "src/types";
import CHARCOAL_COLOR from "src/utils/CHARCOAL_COLOR";

export type ColorModel = {
    colors: Color[],
    getColor: (colors: Color[], colorId: number | null | undefined) => Color,
    setColors: Action<ColorModel, Color[]>
}

const colorModel: ColorModel = {
    colors: [/*
            {
                id: null,
                name: "Charcoal",
                value: "#808080"
            },...
        */],
    getColor: (colors, colorId) => {
        const selectedColor = colors
            .find(color => color.id === colorId)
        return selectedColor ? selectedColor : CHARCOAL_COLOR;
    },
    setColors: action((state, rawColors) => {
        state.colors = [CHARCOAL_COLOR, ...rawColors];
    })
};

export default colorModel;