
const getColors = async () => {
    try {
        const response = await fetch("/colors");
        const rawColors = await response.json(); // colors from DB
        return rawColors;
    } catch (error) {
        if (error instanceof Error) console.error(error.message);
    }
}

export default getColors;