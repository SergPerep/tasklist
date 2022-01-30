import useColorsStore from "../store/useColorsStore";

const setColors = useColorsStore.getState().setColors;

const getColors = async () => {
    try {
        const response = await fetch("/colors");
        const rawColors = await response.json(); // colors from DB
        setColors(rawColors);
    } catch (error) {
        console.error(error.message);
    }
}

export default getColors;