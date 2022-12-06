import catchError from "src/utils/catchError";

const apiUrl = process.env.REACT_APP_API_URL;

const loginUser = async (username: string, password: string) => {
  try {
    const body = { username, password };
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.status < 200 || response.status > 299)
      return console.log(await response.json());

    const { isAuthenticated } = await response.json();
    console.log({ isAuthenticated });
    return isAuthenticated;
  } catch (error) {
    catchError(error);
  }
};

export default loginUser;
