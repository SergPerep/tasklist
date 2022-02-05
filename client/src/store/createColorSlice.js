console.log("--> useColorStore");

const charchoal = {
    id: null,
    name: "Charcoal",
    label: "#808080",
    font: "#000000",
    fill: "rgba(0, 0, 0, 0.12)"
}

export default (set, get) => ({
    colors: [/*
            {
                id: null,
                name: "Charcoal",
                label: "#808080",
                font: "#000000",
                fill: "rgba(0, 0, 0, 0.12)"
            },...
        */],
    getColor(colorId) {
        return get().colors
            .find(color => color.id === colorId)
    },
    setColors: (rawColors) => set({ colors: [charchoal, ...rawColors] })
});