import create from "zustand";
import useTasksStore from "./useTasksStore";
import useColorsStore from "./useColorsStore";

const tasks = useTasksStore.getState().tasks;
const colors = useColorsStore.getState().colors;

export default create(set => ({
    sections: {
        list: [{
            id: "inb",
            name: "Inbox",
            leftIcon: "Inbox",
            tasksNum: 0,
            selected: true,
            isAProject: false
        },
        {
            id: "td",
            name: "Today",
            tasksNum: 0,
            leftIcon: "Today",
            selected: false,
            isAProject: false
        },
        {
            id: "tmr",
            name: "Tomorrow",
            tasksNum: 0,
            leftIcon: "Tomorrow",
            selected: false,
            isAProject: false
        },
            /**
               id: "3",
               name: "Work",
               taskNum: 8,
               selected: false,
               isAProject: true,
               color: {
                   id: 4,
                   name: "Berry Red",
                   fill: "rgba(151, 17, 67, 0.16)",
                   font: "#681735",
                   label: "#BC245D"
               }
           */
        ],
        getSelectedSection() {
            return this.list
                .find(section => section.selected === true);
        }
    },
    select: (id) => set(state => {
        const newSections = { ...state.sections };
        console.log(newSections);
        newSections.list.map(section => {
            section.selected = section.id === id;
            return { section }
        });
        return { sections: newSections };
    }),
    setSections: (projects) => set(state => {
        // console.log(tasks);
        const newSections = { ...state.sections };
        const newProjects = projects.map(project => {
            return {
                id: project.id,
                name: project.name,
                tasksNum: tasks.getProjectTasks(project.id)?.length,
                selected: false,
                isAProject: true,
                color: colors.getColor(project.color_id)
            };
        });
        const notProjects = newSections.list.filter(section => !section.isAProject);
        newSections.list = [...notProjects, ...newProjects];
        return { sections: newSections }
    })
}));