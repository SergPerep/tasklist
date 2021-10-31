import { createContext, useState, useEffect } from "react";

export const ProjectsContext = createContext();

export const ProjectsProvider = props => {
    const [projects, setProjects] = useState([]);
    const data = {
        projects,
        setProjects
    }
    const getFolders = async () => {
        try {
            const response = await fetch("http://localhost:5000/folders");
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error(error.message);
        }
    }
    useEffect(() => {
        getFolders();
    }, [])
    return (
        <ProjectsContext.Provider value={data}>
            {props.children}
        </ProjectsContext.Provider>
    )
}