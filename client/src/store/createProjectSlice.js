
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
    setProjects: (folders) => set({ projects: folders })
});

export default createProjectSlice;