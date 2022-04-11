import { GetState, SetState } from "zustand";

const charcoal: Color = {
    id: null,
    name: "Charcoal",
    value: "#808080"
}

type Color = {
    id: number | null,
    name: string,
    value: string
}

type Colors = Color[];

type ColorSlice = {
    colors: Colors,
    getColor: (colorId: number | null) => Color,
    setColors: (rawColors: Colors) => void
}

const createColorSlice = (set: SetState<any>, get: GetState<ColorSlice>): ColorSlice => ({
    colors: [/*
            {
                id: null,
                name: "Charcoal",
                value: "#808080"
            },...
        */],
    getColor(colorId) {
        const selectedColor =  get().colors
            .find(color => color.id === colorId)
        return selectedColor ? selectedColor : charcoal;
    },
    setColors: (rawColors) => set({ colors: [charcoal, ...rawColors] })
});

export default createColorSlice;