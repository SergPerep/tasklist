import { createContext, useEffect, useState } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = props => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const checkWhetherUserIsAuthenticated = async () => {
        try {
            const response = await fetch("http://localhost:5000/auth/check-auth", {
                method: "GET",
                credentials: "include"
            });

            if (response.status < 200 || response.status > 299) return await response.json();

            const { isAuthenticated } = await response.json();
            console.log(isAuthenticated);
            setIsUserAuthenticated(isAuthenticated === true);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        checkWhetherUserIsAuthenticated();
    }, [])


    const loginUser = async (username, password) => {
        try {
            const body = { username, password };
            // console.log(body);
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });


            if (response.status < 200 || response.status > 299) return console.log(await response.json());

            const { isAuthenticated } = await response.json();
            if (isAuthenticated !== true) setIsUserAuthenticated(isAuthenticated === true);
            await checkWhetherUserIsAuthenticated();

        } catch (error) {
            console.error(error.message);
        }
    }

    const valuesToShare = {
        isUserAuthenticated,
        setIsUserAuthenticated,
        loginUser
    };

    return <AuthenticationContext.Provider value={valuesToShare}>
        {props.children}
    </AuthenticationContext.Provider>
}