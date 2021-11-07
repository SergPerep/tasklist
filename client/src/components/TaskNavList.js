import { useContext, useState } from "react";
import { ProjectsContext } from "./ProjectsContext";
import { TasklistContext } from "./TasklistContext";
import TaskNavItem from "./TaskNavItem";
import date from "date-and-time";
import { today, tomorrow } from "./TodayTomorrowVars";
import { OpenAndCloseEditContext } from "./OpenAndCloseEditContext";

const TaskNavList = props => {
    const { projects } = useContext(ProjectsContext);
    const [openProjects, setOpenProjects] = useState(false);
    const { selectedNavItem, setSelectedNavItem } = props.data;
    const { taskList } = useContext(TasklistContext);
    const { closeAllEdits } = useContext(OpenAndCloseEditContext);
    const handleClickProjects = () => {
        setOpenProjects(!openProjects);
    };

    return (
        <div className="tasknav">
            <TaskNavItem
                leftIcon="Inbox"
                count={taskList.filter(task => !task.status_of_completion && !task.folder.id).length}
                onClick={() => {
                    setSelectedNavItem("Inbox");
                    closeAllEdits();
                }}
                selected={typeof selectedNavItem === "string" && selectedNavItem.toLowerCase() === "inbox"}>
                Inbox
            </TaskNavItem>
            <TaskNavItem
                leftIcon="Today"
                count={taskList.filter(task => !task.status_of_completion && task.date_and_time && (today.getTime() > task.date_and_time.getTime() || date.isSameDay(task.date_and_time, today))).length}
                onClick={() => {
                    setSelectedNavItem("Today");
                    closeAllEdits();
                }}
                selected={typeof selectedNavItem === "string" && selectedNavItem.toLowerCase() === "today"}>
                Today
            </TaskNavItem>
            <TaskNavItem
                leftIcon="Tomorrow"
                count={taskList.filter(task => !task.status_of_completion && task.date_and_time && date.isSameDay(task.date_and_time, tomorrow)).length}
                onClick={() => {
                    setSelectedNavItem("Tomorrow");
                    closeAllEdits();
                }}
                selected={typeof selectedNavItem === "string" && selectedNavItem.toLowerCase() === "tomorrow"}>
                Tomorrow
            </TaskNavItem>
            <TaskNavItem leftIcon="Calendar">Calendar</TaskNavItem>
            <TaskNavItem leftIcon={openProjects ? "AngleDown" : "AngleRight"} rightIcon="Plus" onClick={handleClickProjects}>Projects</TaskNavItem>
            {openProjects &&
                projects.map(project => <TaskNavItem
                    leftIcon="Folder"
                    key={project.id}
                    count={taskList.filter(task => !task.status_of_completion && task.folder.id && task.folder.name === project.name).length}
                    onClick={() => {
                        setSelectedNavItem(project.id);
                        closeAllEdits();
                    }}
                    selected={typeof selectedNavItem === "number" && selectedNavItem === project.id}>
                    {project.name}
                </TaskNavItem>)
            }
        </div>
    )
}

export default TaskNavList;