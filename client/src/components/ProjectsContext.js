import { createContext, useState, useEffect, useContext } from "react";
import { TasklistContext } from "./DatabaseContext";

export const ProjectsContext = createContext();

export const ProjectsProvider = props => {
    

    
    

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