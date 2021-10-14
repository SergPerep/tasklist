import React from "react";
import Checkbox from "./Checkbox";

const TaskItem = (props) => {
    const {id, description, status_of_completion} = props.data;
    return (
        <div className="taskitem">
            <Checkbox />
            <div className="taskitem-content-wrapper">
                <div className="taskitem-desc">{description}</div>
            </div>
            
        </div>
    )
}

export default TaskItem;