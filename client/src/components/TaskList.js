import React, { useContext, useState } from "react";
import TaskItem from "./TaskItem";
import { TasklistContext } from "./TasklistContext";
import date from "date-and-time";
import Accordion from "./Accordion";
import { today, tomorrow } from "./TodayTomorrowVars";


const TaskList = ({ currSection }) => {
    // Grab state out of «value» of context
    const { taskList } = useContext(TasklistContext);
    const [showCompleted, setShowCompleted] = useState(true);

    const inboxTaskList = taskList
        .filter(task => !task.status_of_completion ? !task.folder.id : false)
        .map(task => <TaskItem data={task} key={task.id}></TaskItem>);

    const completedInboxTaskList = taskList
        .filter(task => task.status_of_completion ? !task.folder.id : false)
        .map(task => <TaskItem data={task} key={task.id}></TaskItem>);

    const areThereCompletedInboxTasks = true && taskList
        .find(task => task.status_of_completion ? !task.folder.id : false);

    const overdueTaskList = taskList
        .filter(task => {
            if (!task.status_of_completion) {
                if (task.date_and_time) {
                    return task.date_and_time.getTime() <= today.getTime() && !date.isSameDay(task.date_and_time, today);
                } else return false;
            } else return false;
        })
        .map(task => <TaskItem data={task} key={task.id}></TaskItem>);

    const areThereOverdueTasks = true && taskList
        .find(task => {
            if (!task.status_of_completion) {
                if (task.date_and_time) {
                    return task.date_and_time.getTime() <= today.getTime();
                } else return false;
            } else return false;
        });

    const todayTaskList = taskList
        .filter(task => {
            if (!task.status_of_completion) {
                if (task.date_and_time) {
                    return date.isSameDay(task.date_and_time, today);
                } else return false;
            } else return false;
        })
        .map(task => <TaskItem data={task} key={task.id}></TaskItem>);

    const tomorrowTaskList = taskList
        .filter(task => {
            if (!task.status_of_completion) {
                if (task.date_and_time) {
                    return date.isSameDay(task.date_and_time, tomorrow);
                } else return false;
            } else return false;
        })
        .map(task => <TaskItem data={task} key={task.id}></TaskItem>);

    const completedTodayTaskList = taskList
        .filter(task => {
            if (task.status_of_completion) {
                if (task.date_and_time) {
                    return date.isSameDay(task.time_of_last_update, today);
                } else return false;
            } else return false;
        })
        .map(task => <TaskItem data={task} key={task.id}></TaskItem>);

    const areThereCompletedTodayTasks = true && taskList
        .find(task => {
            if (task.status_of_completion) {
                if (task.date_and_time) {
                    return date.isSameDay(task.time_of_last_update, today);
                } else return false;
            } else return false;
        });

    const completedTomorrowTaskList = taskList
        .filter(task => {
            if (task.status_of_completion) {
                if (task.date_and_time) {
                    return date.isSameDay(task.date_and_time, tomorrow);
                } else return false;
            } else return false;
        })
        .map(task => <TaskItem data={task} key={task.id}></TaskItem>);

    const areThereCompletedTomorrowTasks = true && taskList
        .find(task => {
            if (task.status_of_completion) {
                if (task.date_and_time) {
                    return date.isSameDay(task.date_and_time, tomorrow);
                } else return false;
            } else return false;
        });

    const makeProjectTaskList = currSection => {
        return taskList
            .filter(task => {
                if (!task.status_of_completion) {
                    return task.folder.id ? task.folder.id === currSection : false;
                } else return false;
            })
            .map(task => <TaskItem data={task} key={task.id}></TaskItem>)
    }
    const makeCompletedProjectTaskList = currSection => {
        return taskList
            .filter(task => {
                if (task.status_of_completion) {
                    return task.folder.id ? task.folder.id === currSection : false;
                } else return false;
            })
            .map(task => <TaskItem data={task} key={task.id}></TaskItem>)
    }
    const areThereCompletedProjectTasks = currSection => {
        return true && taskList
            .find(task => {
                if (task.status_of_completion) {
                    return task.folder.id ? task.folder.id === currSection : false;
                } else return false;
            })
    }
    return (
        <div className="tasklist">
            {typeof currSection === "string" && currSection.toLowerCase() === "inbox" &&
                <>
                    {inboxTaskList}
                    {showCompleted && areThereCompletedInboxTasks &&
                        <Accordion title="Completed" count={completedTodayTaskList.length}>
                            {completedInboxTaskList}
                        </Accordion>
                    }
                </>
            }
            {typeof currSection === "string" && currSection.toLocaleLowerCase() === "today" &&
                <>
                    {areThereOverdueTasks &&
                        <>
                            <Accordion title="Overdue" count={overdueTaskList.length}>
                                {overdueTaskList}
                            </Accordion>
                            <Accordion title="Today" count={todayTaskList.length}>
                                {todayTaskList}
                            </Accordion>
                        </>
                    }
                    {!areThereOverdueTasks &&
                        todayTaskList
                    }
                    {showCompleted && areThereCompletedTodayTasks &&
                        <Accordion title="Completed" count={completedTodayTaskList.length}>
                            {completedTodayTaskList}
                        </Accordion>
                    }
                </>
            }
            {typeof currSection === "string" && currSection.toLocaleLowerCase() === "tomorrow" &&
                <>
                    {tomorrowTaskList}
                    {showCompleted && areThereCompletedTomorrowTasks &&
                        <Accordion title="Completed" count={completedTomorrowTaskList.length}>
                            {completedTomorrowTaskList}
                        </Accordion>
                    }
                </>
            }
            {typeof currSection === "number" &&
                <>
                    {makeProjectTaskList(currSection)}
                    {showCompleted && areThereCompletedProjectTasks(currSection) &&
                        <Accordion title="Completed" count={makeCompletedProjectTaskList(currSection).length}>
                            {makeCompletedProjectTaskList(currSection)}
                        </Accordion>
                    }
                </>
            }

        </div>
    )
}

export default TaskList;