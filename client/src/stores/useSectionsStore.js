import create from "zustand";
import useTasksStore from "./useTasksStore";
import useColorsStore from "./useColorsStore";
import { devtools } from "zustand/middleware"

console.log("--> useSectionStore");

const tasks = useTasksStore.getState().tasks;
const colors = useColorsStore.getState().colors;

const defaultSections = [{
    id: "inb",
    name: "Inbox",
    leftIcon: "Inbox",
    tasksNum: null,
    selected: true,
    isAProject: false
},
{
    id: "td",
    name: "Today",
    tasksNum: null,
    leftIcon: "Today",
    selected: false,
    isAProject: false
},
{
    id: "tmr",
    name: "Tomorrow",
    tasksNum: null,
    leftIcon: "Tomorrow",
    selected: false,
    isAProject: false
}]

const store = set => ({
    sections: {
        list: [...defaultSections
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
        console.log("--> setSections");
        const newSections = {...state.sections};
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
        // const notProjects = newSections.list.filter(section => !section.isAProject);
        newSections.list = [...defaultSections, ...newProjects];
        newSections.list
            .map(section => {
                if (section.id === "inb") section.tasksNum = tasks.getInboxTasks().length;
                if (section.id === "td") section.tasksNum = tasks.getTodayTasks().length;
                if (section.id === "tmr") section.tasksNum = tasks.getTomorrowTasks().length;
                return section;
            })
        console.log({ newSections });
        return { sections: newSections }
    })
});

export default create(store);