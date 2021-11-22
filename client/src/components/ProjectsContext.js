import { createContext, useState, useEffect} from "react";

export const ProjectsContext = createContext();

export const ProjectsProvider = props => {
    const [projects, setProjects] = useState([]);

    // GET FOLDERS //

    const getFolders = async () => {
        try {
            const response = await fetch("http://localhost:5000/folders");
            const data = await response.json();
            setProjects(data);
            // Return array
            return data; // expect: [{name: "Work", id: 3}, ...]
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getFolders();
    }, [])

    // ADD PROJECT //

    const addProject = async (folderName) => {
        try {
            const body = { folderName };
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
        } catch (error) {
            console.error(error.message);
        }
    }

    // UPDATE NAME OF THE PROJECT //

    const updateProject = async (id, folderName) => {
        try {
            const body = { folderName };
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
        updateProject
    }

    return (
        <ProjectsContext.Provider value={contextValue}>
            {props.children}
        </ProjectsContext.Provider>
    )
}