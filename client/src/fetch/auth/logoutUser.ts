import catchError from "src/utils/catchError";

const logoutUser = async () => {
    try {
        const response = await fetch("/auth/logout", {
            method: "GET",
            credentials: "include"
        });

        const { isAuthenticated } = await response.json();
        console.log({ isAuthenticated });
        return isAuthenticated;
    } catch (error) {
        catchError(error);
    }
}

export default logoutUser;