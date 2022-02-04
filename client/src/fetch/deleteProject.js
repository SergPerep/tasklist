import getFolders from "./getFolders";
import getTasks from "./getTasks";

const deleteProject = async (id) => {
    try {
        const delProject = await fetch(`/folders/${id}`, {
            method: "DELETE"
        });
        const message = await delProject.json();
        console.log(message);
        getFolders();
        getTasks();
    } catch (error) {
        console.error(error.message);
    }
}

export default deleteProject;