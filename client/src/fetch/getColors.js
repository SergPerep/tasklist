
const getColors = async () => {
    try {
        const response = await fetch("/colors");
        const rawColors = await response.json(); // colors from DB
        return rawColors;
    } catch (error) {
        console.error(error.message);
    }
}

export default getColors;