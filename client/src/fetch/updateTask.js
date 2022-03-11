import getTasks from "./getTasks";
import date from "date-and-time";
import useStore from "../store/useStore";
import { EmptyValueError, ValidationError, WrongTypeError } from "../utils/customErrors";
import catchError from "../utils/catchError";

const setTasks = useStore.getState().setTasks;
const timeZoneOffsetStr = date.format(new Date(), 'ZZ');

const updateTask = async ({ id, description, dateStr = null, timeStr = null, projectId = null }) => {
    try {

        if (!id) throw new EmptyValueError(undefined, { id });
        if (typeof id !== "number") throw new WrongTypeError("number", id, { id });

        if (!description) throw new EmptyValueError(undefined, { description });
        if (typeof description !== "string") throw new WrongTypeError("string", description, { description });
        if (!description.trim()) throw new EmptyValueError(undefined, { description });
        description = description.trim();

        if (dateStr) {
            if (typeof dateStr !== "string") throw new WrongTypeError("string", dateStr, { dateStr });
            if (!date.isValid(dateStr, "YYYY-MM-DD")) throw new ValidationError("Expected valid date string YYYY-MM-DD instead of", { dateStr });
        }

        if (timeStr) {
            if (typeof timeStr !== "string") throw new WrongTypeError("string", timeStr, { timeStr });
            if (!date.isValid(timeStr, "HH:mm")) throw new ValidationError("Expected valid time string HH:mm instead of", { timeStr });
        }
        if (timeStr === "") timeStr = null;
        if (timeStr) timeStr = timeStr + timeZoneOffsetStr;

        if (projectId) {
            if (typeof projectId !== "number" && typeof projectId !== "string") throw new WrongTypeError("number or string", projectId, { projectId })
            if (typeof projectId === "string") projectId = null;
        }

        const body = {
            description: description,
            date: dateStr || null,
            time: timeStr || null,
            folder_id: projectId
        }
        const editTask = await fetch(`/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const message = await editTask.json();
        console.log(message);
        getTasks().then(data => setTasks(data));
    } catch (error) {
        catchError(error);
    }
}

export default updateTask;