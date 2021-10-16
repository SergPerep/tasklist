import React from "react";
import Checkbox from "./Checkbox";
import date from "date-and-time";

const TaskItem = (props) => {
    const { id, description, status_of_completion, date_and_time, read_time, folder } = props.data;
    const updateStatus = async() => {
        try {
            const body = { status_of_completion: !status_of_completion };
            const updateCheckStatus = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const response = await updateCheckStatus.json();
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div className="taskitem">
            <Checkbox status={status_of_completion} updateStatus={updateStatus}/>
            <div className="taskitem-content-wrapper">
                <div className="taskitem-desc">{description}</div>
                <div className="taskitem-details">
                    {date_and_time && <span className="taskitem-date">
                        {date.format(date_and_time, "MMM DD")}
                    </span>}
                    {read_time && <span className="taskitem-time">
                        {date.format(date_and_time, "hh:mm")}
                    </span>}
                    {folder && <span className="taskitem-folder">{folder}</span>}
                </div>
            </div>

        </div>
    )
}

export default TaskItem;