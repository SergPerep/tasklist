import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import InputTask from "./InputTask";

const TaskList = () => {

    useEffect(() => {
        getTasks();
    }, []);

    const [taskList, setTaskList] = useState([]);

    // Converts data so that JS can work with it
    const convertData = (oldArr) => {
        return oldArr.map(obj => {
            obj.date_and_time = new Date(obj.date_and_time);
            obj.time_of_creation = new Date(obj.time_of_creation);
            obj.time_of_last_update = new Date(obj.time_of_last_update);
            return obj
        });
    };

    // Function makes get-request to server
    const getTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/tasks");
            const rawData = await response.json();
            const data = convertData(rawData);
            setTaskList(data);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className="tasklist">
            {taskList.map(x => <TaskItem data={x} key={x.id}></TaskItem>)}
        </div>
    )
}

export default TaskList;