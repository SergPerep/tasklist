import catchError from "../utils/catchError";
import { EmptyValueError, WrongTypeError } from "../utils/customErrors";
import getFolders from "./getFolders";

const addProject = async (folderName, colorId = null) => {
    try {

        if (!folderName) throw new EmptyValueError(undefined, { folderName });
        if (typeof folderName !== "string") throw new WrongTypeError("string", folderName, { folderName })
        if (!folderName.trim()) throw new EmptyValueError(undefined, { folderName });
        folderName = folderName.trim();

        if (colorId) {
            if (typeof colorId !== "number") throw new WrongTypeError("number", colorId, { colorId })
        }

        const body = { folderName, colorId };
        const response = await fetch("/folders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        // Feddback to client
        const message = await response.json();
        console.log(message);
        // Return current folder
        const folders = await getFolders();
        const currFolder = folders.find(folder => folder.name === folderName);
        return currFolder; // expect: {name: "Music", id: 283}
    } catch (error) {
        catchError(error);
    }
}

export default addProject;