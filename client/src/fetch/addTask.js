import getTasks from "./getTasks";
import useStore from "../store/useStore";

const setTasks = useStore.getState().setTasks;

const addTask = async ({ taskInputValue, selectedDate, pickedTime, pickedProjectId }) => {
    try {
        const body = {
            description: taskInputValue,
            date: selectedDate,
            time: pickedTime,
            folder_id: typeof pickedProjectId === "number" ? pickedProjectId : null
        }
        console.log({body});
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
