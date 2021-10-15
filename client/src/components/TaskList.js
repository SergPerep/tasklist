import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = () => {

    useEffect(() => {
        getTasks();
    }, []);

    const [taskList, setTaskList] = useState([]);

    // Function makes get-request to server
    const getTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/tasks");
            const data = await response.json();
            console.log(data);
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