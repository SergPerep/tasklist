import create from "zustand";
import useSectionsStore from "./createSectionSlice";

// const setSections = useSectionsStore.getState().setSections;

const createProjectSlice = (set, get) => ({
    projects: {
        list: [/*{
            id: 3, 
            name: "Work", 
            color_id: 1
        }, ..
        */],
        getProject(id) {
            return this.list
                .find(project => project.id === id)
        }
    },
    setProjects: (folders) => {
        set(state => {
            const newProjects = { ...state.projects };
            newProjects.list = folders;
            return { projects: newProjects }
        })
        console.log("--> setProjects")
        get().setSections(folders)
        // setSections(folders);
    }
});

export default createProjectSlice;