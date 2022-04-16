import store from "src/store";

const setProjects = store.getActions().setProjects;

const getFolders = async () => {
    try {
        const response = await fetch("/folders");
        const data = await response.json();
        setProjects(data);
        return data; // ex: [{id: 3, name: "Work", color_id: 1}, ...]
    } catch (error) {
        if (error instanceof Error) console.error(error.message);
    }
}

export default getFolders;