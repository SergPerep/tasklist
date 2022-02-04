import getFolders from "./getFolders";
import getTasks from "./getTasks";

// UPDATE NAME OF THE PROJECT //

const updateProject = async (id, folderName, colorId) => {
    try {
        const body = { folderName, colorId };
        console.log(JSON.stringify(body));
        const response = await fetch(`/folders/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const message = await response.json();
        console.log(message);
        getFolders();
        getTasks();
    } catch (error) {
        console.error(error.message);
    }
}

export default updateProject;