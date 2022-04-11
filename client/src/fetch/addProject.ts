import catchError from "../utils/catchError";
import { EmptyValueError, WrongTypeError } from "../utils/customErrors";
import getFolders from "./getFolders";


const addProject = async (folderName: string, colorId: number | null = null, callback: CallableFunction) => {
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
        const { folderId } = await response.json();
        await getFolders();
        // return folderId;
        callback(folderId);
        
    } catch (error) {
        catchError(error);
    }
}

export default addProject;