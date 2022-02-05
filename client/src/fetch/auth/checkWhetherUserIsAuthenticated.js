export default async () => {
    try {
        const response = await fetch("http://localhost:5000/auth/check-auth", {
            method: "GET",
            credentials: "include"
        });

        if (response.status < 200 || response.status > 299) return await response.json();

        const { isAuthenticated } = await response.json();
        console.log(isAuthenticated);
        return isAuthenticated;
    } catch (error) {
        console.error(error.message);
    }
}