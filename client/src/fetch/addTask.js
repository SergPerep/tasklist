import getTasks from "./getTasks";
import useStore from "../store/useStore";
import { EmptyValueError, ValidationError, WrongTypeError } from "../utils/customErrors";
import date from "date-and-time"
import catchError from "../utils/catchError";

const setTasks = useStore.getState().setTasks;

const addTask = async ({ description, dateStr = null, timeStr = null, projectId = null }) => {
    try {

        if (typeof description !== "string") throw new WrongTypeError("string", description, { description });
        description = description.trim();
        if (!description) throw new EmptyValueError(undefined, { description });

        if (dateStr) {
            if (typeof dateStr !== "string") throw new WrongTypeError("string", dateStr, { dateStr });
            if (!date.isValid(dateStr, "YYYY-MM-DD")) throw new ValidationError("Expected valid YYYY-MM-DD instead of", { dateStr });
        }
        if (dateStr === "") dateStr = null;

        if (timeStr) {
            if (typeof timeStr !== "string") throw new WrongTypeError("string", timeStr, { timeStr });
            if (!date.isValid(timeStr, "HH:mm")) throw new ValidationError("Expected valid HH:mm instead of", { timeStr })
        }

        if (projectId) {
            if (typeof projectId !== "string" && typeof projectId !== "number") throw new WrongTypeError("string or number", projectId, { projectId });
            if (typeof projectId === "string") projectId = null
        }

        const body = {
            description: description,
            date: dateStr || null,
            time: timeStr || null,
            folder_id: projectId
        }

        const addTask = await fetch("/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const message = await addTask.json();
        console.log(message);
        getTasks().then(data => setTasks(data));
    } catch (error) {
        catchError(error);
    }
}

export default addTask;
