import date from "date-and-time";
import { today, tomorrow } from "../components/TodayTomorrowVars";

console.log("--> useTaskStore");

const createTaskSlice = (set, get) => ({
    tasks: [/*
            {
                id: 110,
                description: "New",
                status_of_completion: false,
                time_of_creation: "2021-12-17T20:44:25.154Z",
                time_of_last_update: "2021-12-17T20:44:25.154Z",
                date_and_time: "2021-12-16T23:00:00.000Z",
                read_time: false,
                folder: {
                    id: null,
                    name: null
                }
            },...
        */],
    getInboxTasks: (areCompleted = false) => {
        return get().tasks
            .filter(task => task.status_of_completion === areCompleted ? !task.folder.id : false);
    },
    getTodayTasks: (areCompleted = false) => {
        return get().tasks
            .filter(task => {
                if (task.status_of_completion === areCompleted) {
                    if (task.date_and_time) {
                        return date.isSameDay(task.date_and_time, today);
                    } else return false;
                } else return false;
            });
    },
    getOverdueTasks: () => {
        return get().tasks
            .filter(task => {
                if (!task.status_of_completion) {
                    if (task.date_and_time) {
                        return task.date_and_time.getTime() <= today.getTime() && !date.isSameDay(task.date_and_time, today);
                    } else return false;
                } else return false;
            });
    },
    getTomorrowTasks: (areCompleted = false) => {
        return get().tasks
            .filter(task => {
                if (task.status_of_completion === areCompleted) {
                    if (task.date_and_time) {
                        return date.isSameDay(task.date_and_time, tomorrow);
                    } else return false;
                } else return false;
            });
    },
    getProjectTasks: (projectId, areCompleted = false) => {
        return get().tasks
            .filter(task => {
                if (task.status_of_completion === areCompleted) {
                    return task.folder.id ? task.folder.id === projectId : false;
                } else return false;
            })
    },
    isShowCompleted: localStorage.getItem("isShowCompletedTasks") || false,
    setShowCompleted: (isShowCompleted) => set({ isShowCompleted }),
    setTasks: (taskList) => set(state => {
        console.log("--> setTasks");
        return { tasks: taskList }
    }),
})

export default createTaskSlice;