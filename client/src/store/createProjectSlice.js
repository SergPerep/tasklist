import create from "zustand";
import useSectionsStore from "./createSectionSlice";

// const setSections = useSectionsStore.getState().setSections;

const createProjectSlice = (set, get) => ({
    projects: [/*{
            id: 3, 
            name: "Work", 
            color_id: 1
        }, ..
        */],
    getProject: (id) => {
        return get().projects
            .find(project => project.id === id)
    },
    setProjects: (folders) => {
        set(state => {
            return { projects: folders }
        })
        console.log("--> setProjects")
        get().setSections(folders)
        // setSections(folders);
    }
});

export default createProjectSlice;