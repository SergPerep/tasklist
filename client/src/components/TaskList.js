import React from "react";
import TaskItem from "./TaskItem";

const data = [
    {   
        id: 1,
        description: "This is my new task",
        status_of_completion: false
    },
    {
        id: 2,
        description: "Search for a good physeotherapist in Houten and Utrecht. And add new meeting to calendar.",
        status_of_completion: false
    },
    {
        id: 3,
        description: "This is my new task",
        status_of_completion: false
    }
];


const TaskList = () => {
    return (
        <div className="tasklist">
            {data.map( x =>  <TaskItem data={x} key={x.id} />)}
        </div>
    )
}

export default TaskList;