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
        console.error(error.message);
    }
}

export default logoutUser;