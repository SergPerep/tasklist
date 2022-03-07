
const charchoal = {
    id: null,
    name: "Charcoal",
    value: "#808080"
}

const createColorSlice = (set, get) => ({
    colors: [/*
            {
                id: null,
                name: "Charcoal",
                value: "#808080"
            },...
        */],
    getColor(colorId) {
        return get().colors
            .find(color => color.id === colorId)
    },
    setColors: (rawColors) => set({ colors: [charchoal, ...rawColors] })
});

export default createColorSlice;