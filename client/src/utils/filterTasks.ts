import date from "date-and-time";
import { today, tomorrow } from "./days";
import { Task } from "../types";


export const filterInboxTasks = (tasks: Task[], areCompleted = false) => {
    // console.log("--> getInboxTasks");
    return tasks
        ?.filter(task => task.isCompleted === areCompleted ? !task.folder.id : false);
}

export const filterTodayTasks = (tasks: Task[], areCompleted = false) => {
    return tasks
        ?.filter(task => {
            if (task.isCompleted !== areCompleted) return false;
            if (!task.dateStr) return false;
            const dateObj = new Date(task.dateStr);
            return date.isSameDay(dateObj, today);
        });
}

export const filterOverdueTasks = (tasks: Task[]) => {
    return tasks
        ?.filter(task => {
            if (task.isCompleted === true) return false;
            if (!task.dateStr) return false;
            const dateObj = new Date(task.dateStr)
            return dateObj.getTime() <= today.getTime() && !date.isSameDay(dateObj, today);
        });
}
export const filterTomorrowTasks = (tasks: Task[], areCompleted = false) => {
    return tasks
        ?.filter(task => {
            if (task.isCompleted !== areCompleted) return false;
            if (!task.dateStr) return false;
            const dateObj = new Date(task.dateStr);
            return date.isSameDay(dateObj, tomorrow);
        });
}
export const filterProjectTasks = (tasks: Task[], projectId: number | string, areCompleted = false) => {
    return tasks
        ?.filter(task => {
            if (task.isCompleted !== areCompleted) return false;
            return task.folder.id ? task.folder.id === projectId : false;
        })
}