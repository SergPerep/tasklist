import create from "zustand";
import useSectionsStore from "./useSectionsStore";

const setSections = useSectionsStore.getState().setSections;

export default create(set => ({
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
        setSections(folders);
    }
}));