import getTasks from "./getTasks";
import useStore from "../store/useStore";
import date from "date-and-time";

const setTasks = useStore.getState().setTasks;

const addTask = async ({ taskInputValue, selectedDate, considerTime, pickedProjectId }) => {
    try {
        const body = {
            description: taskInputValue,
            date_and_time: selectedDate ? date.format(selectedDate, "YYYY-MM-DD HH:mm:ss") : undefined,
            read_time: considerTime,
            folder_id: pickedProjectId
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
        console.error(error.message);
    }
}

export default addTask;
