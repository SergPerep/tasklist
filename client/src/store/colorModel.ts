import { action, Action } from "easy-peasy";
import { Color } from "src/types";
import COAL_COLOR from "src/utils/COAL_COLOR";

export type ColorModel = {
    colors: Color[],
    getColor: (colors: Color[], colorId: number | null | undefined) => Color,
    setColors: Action<ColorModel, Color[]>
}

const colorModel: ColorModel = {
    colors: [/*
            {
                id: null,
                name: "Coal",
                value: "#808080"
            },...
        */],
    getColor: (colors, colorId) => {
        const selectedColor = colors
            .find(color => color.id === colorId)
        return selectedColor ? selectedColor : COAL_COLOR;
    },
    setColors: action((state, rawColors) => {
        state.colors = [COAL_COLOR, ...rawColors];
    })
};

export default colorModel;