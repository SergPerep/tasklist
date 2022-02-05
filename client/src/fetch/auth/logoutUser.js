export default async () => {
    try {
        const response = await fetch("http://localhost:5000/auth/logout", {
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