import { WrongTypeError, EmptyValueError } from "../utils/customErrors";
import catchError from "../utils/catchError";

const checkWhetherUsernameExists = async (username: string) => {
    try {
        if (!username) throw new EmptyValueError(undefined, username);
        if (typeof username !== "string") throw new WrongTypeError("string", username, { username });
        
        const body = { username };
        const response = await fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const { isUsernameExists } = await response.json();
        return isUsernameExists;
    } catch (error) {
        catchError(error)
    }
}

export default checkWhetherUsernameExists;