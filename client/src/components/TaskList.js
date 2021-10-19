import React, { useContext } from "react";
import TaskItem from "./TaskItem";
import { TasklistContext } from "./TasklistContext";
import date from "date-and-time";

const TaskList = () => {
    // Grab state out of «value» of context
    const { taskList } = useContext(TasklistContext);

    // Options for the filter
    const taskListFilter = (task, filter) => {
        if (filter === "today") {
            const today = new Date();
            const isToday = task.date_and_time.toDateString() === today.toDateString();
            return isToday;
        }
        if (filter === "tomorrow") {
            const today = new Date();
            const tomorrow = date.addDays(today, 1);
            const isTomorrow = task.date_and_time.toDateString() === tomorrow.toDateString();
            return isTomorrow;
        }
        if (filter === "inbox" ||  filter === undefined) {
            return !task.folder;
        }
    }

    return (
        <div className="tasklist">
            {taskList
                .filter(task => taskListFilter(task, "inbox"))
                .map(task => <TaskItem data={task} key={task.id}></TaskItem>)}
        </div>
    )
}

export default TaskList;