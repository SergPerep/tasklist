export default async (username, password) => {
    try {
        const body = { username, password };
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (response.status < 200 || response.status > 299) return console.log(await response.json());

        const { isAuthenticated } = await response.json();
        console.log({ isAuthenticated });
        return isAuthenticated;
    } catch (error) {
        console.error(error.message);
    }
}