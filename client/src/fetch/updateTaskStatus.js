import useStore from "../store/useStore";
import getTasks from "./getTasks";

const setTasks = useStore.getState().setTasks;

const updateTaskStatus = async (id, status_of_completion) => {
    try {
        const body = { status_of_completion: !status_of_completion };
        const updateCheckStatus = await fetch(`/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const response = await updateCheckStatus.json();
        console.log(response);

        getTasks().then(data => setTasks(data));
    } catch (error) {
        console.error(error.message);
    }
}

export default updateTaskStatus;