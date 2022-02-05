import useStore from "../store/useStore";

const setColors = useStore.getState().setColors;

const getColors = async () => {
    try {
        const response = await fetch("/colors");
        const rawColors = await response.json(); // colors from DB
        console.log("--> getColors")
        // setColors(rawColors);
        return rawColors;
    } catch (error) {
        console.error(error.message);
    }
}

export default getColors;