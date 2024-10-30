import { action, Action } from "easy-peasy";
import { Task } from "src/types";

export type TaskModel = {
    tasks: Task[],
    isShowCompletedTasks: boolean,
    setIsShowCompletedTasks: Action<TaskModel, boolean>,
    setTasks: Action<TaskModel, Task[] | void>
}

const taskModel: TaskModel = {
    tasks: [/*
            {
                id: 110,
                description: "New",
                isCompleted: false,
                time_of_creation: "2021-12-17T20:44:25.154Z",
                date: "2021-12-16",
                time: false,
                folder.id: null,
                folder.name: null
            },...
        */],
    isShowCompletedTasks: localStorage.getItem("isShowCompletedTasks") === "true",

    setIsShowCompletedTasks: action((state, booleanVal) => {
        state.isShowCompletedTasks = booleanVal;
    }),
    setTasks: action((state, taskList) => {
        if (taskList) state.tasks = taskList;
    })
}

export default taskModel;