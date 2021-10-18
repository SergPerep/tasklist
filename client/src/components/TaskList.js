import React, {useContext} from "react";
import TaskItem from "./TaskItem";
import { TasklistContext } from "./TasklistContext";

const TaskList = () => {
    // Grab state out of «value» of context
    const {taskList} = useContext(TasklistContext);

    return (
        <div className="tasklist">
            {taskList.map(x => <TaskItem data={x} key={x.id}></TaskItem>)}
        </div>
    )
}

export default TaskList;