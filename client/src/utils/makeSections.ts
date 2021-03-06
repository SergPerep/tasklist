import { Color, Project, Section, Task } from "src/types";
import { filterInboxTasks, filterTodayTasks, filterOverdueTasks, filterTomorrowTasks, filterProjectTasks } from "./filterTasks";
import getColor from "./getColor";

const makeSections = (tasks: Task[], projects: Project[], colors: Color[], selectedSectionId: number | string): Section[] => {

    const defaultSections: Section[] = [{
        id: "inb",
        name: "Inbox",
        leftIcon: "Inbox",
        tasksNum: filterInboxTasks(tasks, false)?.length,
        selected: "inb" === selectedSectionId,
        isAProject: false
    },
    {
        id: "td",
        name: "Today",
        tasksNum: filterTodayTasks(tasks, false)?.length + filterOverdueTasks(tasks)?.length,
        leftIcon: "Today",
        selected: "td" === selectedSectionId,
        isAProject: false
    },
    {
        id: "tmr",
        name: "Tomorrow",
        tasksNum: filterTomorrowTasks(tasks, false)?.length,
        leftIcon: "Tomorrow",
        selected: "tmr" === selectedSectionId,
        isAProject: false
    }]

    if (!Array.isArray(tasks) && !Array.isArray(projects) && !Array.isArray(colors)) return defaultSections;

    let modifiedProjects = [...projects]?.map(project => {
        return {
            id: project.id,
            name: project.name,
            tasksNum: filterProjectTasks(tasks, project.id)?.length,
            selected: project.id === selectedSectionId,
            isAProject: true,
            colorVal: getColor(colors, project.color_id).value,
            colorId: project.color_id
        };
    });

    const sections = [...defaultSections, ...modifiedProjects]
    return sections;
}

export default makeSections;