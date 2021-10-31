import { createContext, useState } from "react"

export const ProjectPickerContext = createContext();

export const ProjectPickerProvider = props => {
    const [selectedProject, setSelectedProject] = useState(undefined); // object when defined
    const data = {
        selectedProject,
        setSelectedProject
    };
    return (
        <ProjectPickerContext.Provider value={data}>
            {props.children}
        </ProjectPickerContext.Provider>
    )
}