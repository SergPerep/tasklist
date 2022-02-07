const deleteTask = async (id) => {
    try {
        const delTask = await fetch(`/tasks/${id}`, {
            method: "DELETE"
        });
        const message = await delTask.json();
    } catch (error) {
        console.error(error.message);
    }
}

export default deleteTask;