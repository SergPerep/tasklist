import catchError from "../utils/catchError";
import { EmptyValueError, WrongTypeError } from "../utils/customErrors";
import getTasks from "./getTasks";
import { toast } from "react-toastify";

const deleteTask = async (id) => {
    try {

        if (!id) throw new EmptyValueError(undefined, { id });
        if (typeof id !== "number") throw new WrongTypeError("number", id, { id });

        const delTask = await fetch(`/tasks/${id}`, {
            method: "DELETE"
        });
        const { messageToUser } = await delTask.json();
        if (messageToUser) toast(messageToUser);
        getTasks();
    } catch (error) {
        catchError(error)
    }
}

export default deleteTask;