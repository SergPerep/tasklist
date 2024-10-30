import catchError from "src/utils/catchError";
const apiUrl = process.env.REACT_APP_API_URL;

const signupUser = async (username: string, password: string) => {
  try {
    const body = { username, password };
    const response = await fetch(`${apiUrl}/auth/register`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.status < 200 || response.status > 299)
      return console.log(await response.json());

    const { isAuthenticated } = await response.json();
    return isAuthenticated;
  } catch (error) {
    catchError(error);
  }
};

export default signupUser;
