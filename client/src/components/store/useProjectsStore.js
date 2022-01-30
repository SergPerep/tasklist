import create from "zustand";
import useSectionsStore from "./useSectionsStore";

const setSections = useSectionsStore.getState().setSections;

export default create(set => ({
    projects: [/*{
        id: 3, 
        name: "Work", 
        color_id: 1
    }, ..
    */],
    setProjects: (folders) => {
        set({ projects: folders })
        setSections(folders);
    }
}));