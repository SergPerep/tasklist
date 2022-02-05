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
    isShowCompletedTasks: localStorage.getItem("isShowCompletedTasks") === "true",
    setIsShowCompletedTasks: (isShowCompletedTasks) => set({ isShowCompletedTasks }),
    setTasks: (taskList) => {
        console.log("--> setTasks");
        set({ tasks: taskList })
    }
})

export default createTaskSlice;