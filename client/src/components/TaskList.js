import React, { useContext } from "react";
import TaskItem from "./TaskItem";
import { TasklistContext } from "./TasklistContext";
import date from "date-and-time";
import { ProjectsContext } from "./ProjectsContext";


const TaskList = ({ filter }) => {
    // Grab state out of «value» of context
    const { taskList } = useContext(TasklistContext);

    // Options for the filter
    const taskListFilter = (task, filter = "inbox") => {
        if (typeof filter === "string") {
            if (filter.toLowerCase() === "today") {
                if (task.date_and_time) {
                    const today = new Date();
                    const isToday = task.date_and_time.toDateString() === today.toDateString();
                    return isToday;
                } else return false;
            } else if (filter.toLowerCase() === "tomorrow") {
                if (task.date_and_time) {
                    const today = new Date();
                    const tomorrow = date.addDays(today, 1);
                    const isTomorrow = task.date_and_time.toDateString() === tomorrow.toDateString();
                    return isTomorrow;
                } else return false;
            } else if (filter.toLowerCase() === "inbox" || filter === undefined) {
                return !task.folder;
            } else {
                if (typeof task.folder === "string") {
                    return task.folder.toLowerCase() === filter.toLocaleLowerCase();
                }   
            }
        }
    }

    return (
        <div className="tasklist">
            {taskList
                .filter(task => taskListFilter(task, filter))
                .map(task => <TaskItem data={task} key={task.id}></TaskItem>)}
        </div>
    )
}

export default TaskList;