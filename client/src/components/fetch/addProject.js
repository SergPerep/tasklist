import getFolders from "./getFolders";

const addProject = async (folderName, colorId) => {
    try {
        const body = { folderName, colorId };
        const response = await fetch("/folders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        // Feddback to client
        const message = await response.json();
        console.log(message);
        // Return current folder
        const folders = await getFolders();
        const currFolder = folders.find(folder => folder.name === folderName);
        return currFolder; // expect: {name: "Music", id: 283}
    } catch (error) {
        console.error(error.message)
    }
}

export default addProject;