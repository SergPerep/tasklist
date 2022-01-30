import create from "zustand";
import useTasksStore from "./useTasksStore";
import useColorsStore from "./useColorsStore";

const tasks = useTasksStore.getState().tasks;
const colors = useColorsStore.getState().colors;

const defaultSections = [{
    id: "inb",
    name: "Inbox",
    leftIcon: "Inbox",
    tasksNum: tasks.getInboxTasks().length,
    selected: true,
    isAProject: false
},
{
    id: "td",
    name: "Today",
    tasksNum: tasks.getTodayTasks().length,
    leftIcon: "Today",
    selected: false,
    isAProject: false
},
{
    id: "tmr",
    name: "Tomorrow",
    tasksNum: tasks.getTomorrowTasks().length,
    leftIcon: "Tomorrow",
    selected: false,
    isAProject: false
}]

export default create(set => ({
    sections: [
        /**
           id: "3",
           name: "Work",
           taskNum: 8,
           selected: false,
           isAProject: true,
           circleColor: 3 
       */
    ],
    select: (id) => set(state => {
        const sections = [...state.sections];
        sections.map(section => {
            section.selected = section.id === id;
            return { section }
        })
        return { sections };
    }),
    setSections: (projects) => set(state => {
        const sections = [...state.sections];
        const newProjects = projects.map(project => {
            return {
                id: project.id,
                name: project.name,
                tasksNum: tasks.getProjectTasks(project.id)?.length,
                selected: false,
                isAProject: true,
                color: colors.getColor(project.color_id)?.label
            };
        });
        return { sections: [...defaultSections, ...newProjects] }
    })
}));