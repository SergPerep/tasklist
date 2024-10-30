import catchError from "src/utils/catchError";
const apiUrl = process.env.REACT_APP_API_URL;

const logoutUser = async () => {
  try {
    const response = await fetch(`${apiUrl}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });

    const { isAuthenticated } = await response.json();
    console.log({ isAuthenticated });
    return isAuthenticated;
  } catch (error) {
    catchError(error);
  }
};

export default logoutUser;
