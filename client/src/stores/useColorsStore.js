import create from "zustand";

const charchoal = {
    id: null,
    name: "Charcoal",
    label: "#808080",
    font: "#000000",
    fill: "rgba(0, 0, 0, 0.12)"
}

export default create(set => ({
    colors: {
        list: [/*
            {
                id: null,
                name: "Charcoal",
                label: "#808080",
                font: "#000000",
                fill: "rgba(0, 0, 0, 0.12)"
            },...
        */],
        getColor(colorId) {
            return this.list
                .find(color => color.id === colorId)
        }
    },
    setColors: (rawColors) => set(state => {
        const newColors = state.colors;
        newColors.list = [charchoal, ...rawColors];
        return { colors: newColors }
    }),
}));