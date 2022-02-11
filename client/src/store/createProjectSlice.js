import { today } from "../utils/days";

const createProjectSlice = (set, get) => ({
    projects: [/*{
            id: 3, 
            name: "Work", 
            color_id: 1
        }, ..
        */],
    anchorDate: new Date(today.getFullYear(), today.getMonth()),
    selectedDate: undefined,
    considerTime: false,
    timeDisplay: null, // Text String for ex. 12:30
    setAnchorDate: date => set({ anchorDate: date }),
    setSelectedDate: date => set({ selectedDate: date }),
    setConsiderTime: hasTime => set({ setConsiderTime: hasTime }),
    setTimeDisplay: timeStr => set({ timeDisplay: timeStr }),
    getProject: (id) => {
        return get().projects
            .find(project => project.id === id)
    },
    setProjects: (folders) => set({ projects: folders })
});

export default createProjectSlice;