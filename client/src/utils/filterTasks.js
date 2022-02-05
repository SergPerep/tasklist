import date from "date-and-time";
import { today, tomorrow } from "../components/TodayTomorrowVars";

export const filterInboxTasks = (tasks, areCompleted = false) => {
    // console.log("--> getInboxTasks");
    return tasks
        ?.filter(task => task.status_of_completion === areCompleted ? !task.folder.id : false);
}

export const filterTodayTasks = (tasks, areCompleted = false) => {
    return tasks
        ?.filter(task => {
            if (task.status_of_completion === areCompleted) {
                if (task.date_and_time) {
                    return date.isSameDay(task.date_and_time, today);
                } else return false;
            } else return false;
        });
}

export const filterOverdueTasks = (tasks) => {
    return tasks
        ?.filter(task => {
            if (!task.status_of_completion) {
                if (task.date_and_time) {
                    return task.date_and_time.getTime() <= today.getTime() && !date.isSameDay(task.date_and_time, today);
                } else return false;
            } else return false;
        });
}
export const filterTomorrowTasks = (tasks, areCompleted = false) => {
    return tasks
        ?.filter(task => {
            if (task.status_of_completion === areCompleted) {
                if (task.date_and_time) {
                    return date.isSameDay(task.date_and_time, tomorrow);
                } else return false;
            } else return false;
        });
}
export const filterProjectTasks = (tasks, projectId, areCompleted = false) => {
    return tasks
        ?.filter(task => {
            if (task.status_of_completion === areCompleted) {
                return task.folder.id ? task.folder.id === projectId : false;
            } else return false;
        })
}