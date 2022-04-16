import store from "src/store";
import { Task } from "src/types";
import catchError from "src/utils/catchError";
import formatTimeStringForTaskState from "../utils/formatTimeStringForTaskState";

const setTasks = store.getActions().setTasks;

// type TaskDB = {
//     id: number,
//     description: string,
//     isCompleted: boolean,
//     time_of_creation: string,
//     date: string,
//     time: string,
//     folder: {
//         id: number | null,
//         name: string | null
//     }
// }

// Converts data so that JS can work with it
const convertData = (oldArr: any[]) => {
    return oldArr.map(obj => {
        obj.folder = {
            id: obj.folder_id,
            name: obj.folder_name,
        }
        obj.isCompleted = obj.is_completed;
        obj.dateStr = obj.date;
        delete obj.date;
        obj.timeStr = formatTimeStringForTaskState(obj.time);
        delete obj.time;
        delete obj.is_completed;
        delete obj.folder_id;
        delete obj.folder_name;
        return obj
    });
};

const getTasks = async (): Promise<Task[] | void> => {
    try {
        const response = await fetch("/tasks");
        const rawData = await response.json();
        const data = convertData(rawData);
        setTasks(data);
        return data;
    } catch (error) {
        catchError(error);
    }
}

export default getTasks;