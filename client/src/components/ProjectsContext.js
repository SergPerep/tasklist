import { createContext, useState, useEffect, useContext } from "react";
import { TasklistContext } from "./TasklistContext";

export const ProjectsContext = createContext();

export const ProjectsProvider = props => {
    const [projects, setProjects] = useState([]);
    const [colors, setColors] = useState([]);
    const { getTasks } = useContext(TasklistContext);
    const [selectedColor, setSelectedColor] = useState(null);

    // GET FOLDERS //

    const getFolders = async () => {
        try {
            const response = await fetch("http://localhost:5000/folders");
            const data = await response.json();
            setProjects(data);
            // Return array
            return data; // ex: [{id: 3, name: "Work", color_id: 1}, ...]
        } catch (error) {
            console.error(error.message);
        }
    }

    

    // COLORS //

    const getColors = async () => {
        try {
            const response = await fetch("http://localhost:5000/colors");
            const rawColors = await response.json(); // colors from DB
            // Add Charcoal to colors from DB
            const refinedColors = [{
                id: null,
                name: "Charcoal",
                label: "#808080",
                font: "#000000",
                fill: "rgba(0, 0, 0, 0.12)"
            }, ...rawColors];
            setColors(refinedColors);
            console.log(refinedColors);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getFolders();
        getColors();
    }, [])

    // ADD PROJECT //

    const addProject = async (folderName, colorId) => {
        try {
            const body = { folderName, colorId };
            const response = await fetch("http://localhost:5000/folders", {
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

    // DELETE PROJECT //

    const deleteProject = async (id) => {
        try {
            const delProject = await fetch(`http://localhost:5000/folders/${id}`, {
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

    // UPDATE NAME OF THE PROJECT //

    const updateProject = async (id, folderName, colorId) => {
        try {
            const body = { folderName, colorId };
            console.log(JSON.stringify(body));
            const response = await fetch(`http://localhost:5000/folders/${id}`, {
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

    

    const contextValue = {
        projects,
        setProjects,
        getFolders,
        addProject,
        deleteProject,
        updateProject,
        colors,
        selectedColor,
        setSelectedColor
    }

    return (
        <ProjectsContext.Provider value={contextValue}>
            {props.children}
        </ProjectsContext.Provider>
    )
}