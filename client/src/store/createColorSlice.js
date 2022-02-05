console.log("--> useColorStore");

const charchoal = {
    id: null,
    name: "Charcoal",
    label: "#808080",
    font: "#000000",
    fill: "rgba(0, 0, 0, 0.12)"
}

export default (set, get) => ({
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
        console.log("--> setColors")
        const newColors = state.colors;
        console.log(newColors);
        newColors.list = [charchoal, ...rawColors];
        return { colors: newColors }
    }),
});