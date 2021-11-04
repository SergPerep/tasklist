import { useContext, useState } from "react";
import { ProjectsContext } from "./ProjectsContext";
import { TasklistContext } from "./TasklistContext";
import TaskNavItem from "./TaskNavItem";
import date from "date-and-time";

const TaskNavList = props => {
    const { projects } = useContext(ProjectsContext);
    const [openProjects, setOpenProjects] = useState(false);
    const { selectedSection, setSelectedSection } = props.data;
    const {taskList} = useContext(TasklistContext);

    const handleClickProjects = () => {
        setOpenProjects(!openProjects);
    };

    return (
        <div className="tasknav">
            <TaskNavItem
                leftIcon="Inbox"
                count={taskList.filter(task => !task.status_of_completion && !task.folder).length}
                onClick={() => { setSelectedSection("Inbox") }}
                selected={typeof selectedSection === "string" && selectedSection.toLowerCase() === "inbox"}>
                Inbox
            </TaskNavItem>
            <TaskNavItem
                leftIcon="Today"
                count={taskList.filter(task => !task.status_of_completion && task.date_and_time && date.isSameDay(task.date_and_time, new Date())).length}
                onClick={() => { setSelectedSection("Today") }}
                selected={typeof selectedSection === "string" && selectedSection.toLowerCase() === "today"}>
                Today
            </TaskNavItem>
            <TaskNavItem
                leftIcon="Tomorrow"
                count={taskList.filter(task => !task.status_of_completion && task.date_and_time && date.isSameDay(task.date_and_time, date.addDays(new Date(), 1))).length}
                onClick={() => { setSelectedSection("Tomorrow") }}
                selected={typeof selectedSection === "string" && selectedSection.toLowerCase() === "tomorrow"}>
                Tomorrow
            </TaskNavItem>
            <TaskNavItem leftIcon="Calendar">Calendar</TaskNavItem>
            <TaskNavItem leftIcon={openProjects ? "AngleDown" : "AngleRight"} rightIcon="Plus" onClick={handleClickProjects}>Projects</TaskNavItem>
            {openProjects &&
                projects.map(project => <TaskNavItem
                    leftIcon="Folder"
                    key={project.id}
                    count={taskList.filter(task => !task.status_of_completion && task.folder && task.folder === project.name).length}
                    onClick={() => { setSelectedSection(project.id) }}
                    selected={typeof selectedSection === "number" && selectedSection === project.id}>
                    {project.name}
                </TaskNavItem>)
            }
        </div>
    )
}

export default TaskNavList;