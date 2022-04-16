import catchError from "src/utils/catchError";

const checkWhetherUserIsAuthenticated = async () => {
    try {
        const response = await fetch("/auth/check-auth", {
            method: "GET",
            credentials: "include"
        });

        if (response.status < 200 || response.status > 299) return await response.json();

        const { isAuthenticated } = await response.json();
        return isAuthenticated;
    } catch (error) {
        catchError(error)
    }
}

export default checkWhetherUserIsAuthenticated;