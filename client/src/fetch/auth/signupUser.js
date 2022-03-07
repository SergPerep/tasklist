const signupUser =  async (username, password) => {
    try {
        const body = { username, password };
        const response = await fetch("/auth/register", {
            credentials: "include",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (response.status < 200 || response.status > 299) return console.log(await response.json());

        const { isAuthenticated } = await response.json();
        return isAuthenticated;
    } catch (error) {
        console.error(error.message);
    }
}

export default signupUser;