export default async () => {
    try {
        const response = await fetch("/auth/check-auth", {
            method: "GET",
            credentials: "include"
        });

        if (response.status < 200 || response.status > 299) return await response.json();

        const { isAuthenticated } = await response.json();
        return isAuthenticated;
    } catch (error) {
        console.error(error.message);
    }
}