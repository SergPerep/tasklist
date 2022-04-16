import { toast } from "react-toastify";
import store from "src/store";
import catchError from "src/utils/catchError";
import { WrongTypeError, EmptyValueError } from "../utils/customErrors";
import getTasks from "./getTasks";

const setTasks = store.getActions().setTasks;

const updateTaskStatus = async (id: number) => {
    try {

        if (!id) throw new EmptyValueError(undefined, { id });
        if (typeof id !== "number") throw new WrongTypeError("number", id, { id });

        // const body = { is_completed: !isCompleted };
        const updateCheckStatus = await fetch(`/tasks/${id}`, {
            method: "PUT"
        });

        const { messageToUser } = await updateCheckStatus.json();
        if (messageToUser) toast(messageToUser);

        getTasks().then(data => setTasks(data));
    } catch (error) {
        catchError(error)
    }
}

export default updateTaskStatus;