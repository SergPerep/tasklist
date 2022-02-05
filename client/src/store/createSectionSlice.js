console.log("--> useSectionStore");

// const tasks = useStore.getState().tasks;
// const colors = useStore.getState().colors;

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

export default (set, get) => ({
    sections: [...defaultSections
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
        return get().sections
            .find(section => section.selected === true);
    },
    select: (id) => set(state => {
        let newSections = [ ...state.sections ];
        newSections.map(section => {
            section.selected = section.id === id;
            return { section }
        });
        return { sections: newSections };
    }),
    setSections: (projects) => set(state => {
        const getProjectTasks = state.getProjectTasks;
        const getColor = state.getColor;
        const newProjects = projects.map(project => {
            return {
                id: project.id,
                name: project.name,
                tasksNum: getProjectTasks(project.id)?.length,
                selected: false,
                isAProject: true,
                color: getColor(project.color_id)
            };
        });
        const newSections = [...defaultSections, ...newProjects];
        newSections
            .map(section => {
                if (section.id === "inb") section.tasksNum = state.getInboxTasks().length;
                if (section.id === "td") section.tasksNum = state.getTodayTasks().length + state.getOverdueTasks().length;
                if (section.id === "tmr") section.tasksNum = state.getTomorrowTasks().length;
                return section;
            })
        // console.log({ newSections });
        return { sections: newSections }
    })
});