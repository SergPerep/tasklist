import { toast } from "react-toastify";
import useStore from "../store/useStore";
import { WrongTypeError, EmptyValueError } from "../utils/customErrors";
import getTasks from "./getTasks";

const setTasks = useStore.getState().setTasks;

const updateTaskStatus = async (id) => {
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
        console.error(error.message);
    }
}

export default updateTaskStatus;