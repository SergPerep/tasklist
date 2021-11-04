import { createContext, useContext } from "react";
import { ProjectsContext } from "./ProjectsContext";

export const SectionsContext = createContext();

export const SectionsProvider = props => {
    const { projects } = useContext(ProjectsContext);
    const sections = ["Inbox", "Today", "Tomorrow", { id: 1, name: "Dutch"}, {id: 2, name: "Music"}]
    const contextValue = {

    };
    return (
        <SectionsContext.Provider value={contextValue}>
            {props.children}
        </SectionsContext.Provider>
    )
}