const apiUrl = process.env.REACT_APP_API_URL;
const getColors = async () => {
  try {
    const response = await fetch(`${apiUrl}/colors`, {
      credentials: "include",
    });
    const rawColors = await response.json(); // colors from DB
    return rawColors;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

export default getColors;
