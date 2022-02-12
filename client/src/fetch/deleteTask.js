import catchError from "../utils/catchError";
import { EmptyValueError, WrongTypeError } from "../utils/customErrors";

const deleteTask = async (id) => {
    try {

        if (!id) throw new EmptyValueError(undefined, { id });
        if (typeof id !== "number") throw new WrongTypeError("number", id, { id });

        const delTask = await fetch(`/tasks/${id}`, {
            method: "DELETE"
        });
        const message = await delTask.json();
    } catch (error) {
        catchError(error)
    }
}

export default deleteTask;