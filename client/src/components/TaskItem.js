import React, { useState, useContext } from "react";
import Checkbox from "./Checkbox";
import date from "date-and-time";
import { TasklistContext } from "./TasklistContext";
import { useClickOutside } from "./CustomHooks";
import EditTask from "./EditTask";
import { OpenAndCloseEditContext } from "./OpenAndCloseEditContext";

const TaskItem = props => {
    const { id, description, status_of_completion, date_and_time, read_time, folder } = props.data;
    const { getTasks } = useContext(TasklistContext);
    const { openEditArr, openOneEditCloseAllOther } = useContext(OpenAndCloseEditContext);
    const openThisEdit = openEditArr.find(x => x.id === id) ? openEditArr.find(x => x.id === id).openEdit : false;
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    // Handles click outside of «more»
    const more = useClickOutside(() => {
        setMenuIsOpen(false);
    });

    // Handles click on «more»
    const handleClickMore = () => {
        setMenuIsOpen(!menuIsOpen);
    }

    const updateStatus = async () => {
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


    const handleClickEdit = () => {
        openOneEditCloseAllOther(id);
    }


    const deleteTask = async () => {
        try {
            const delTask = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: "DELETE"
            });
            const message = await delTask.json();
            console.log(message);
            getTasks();
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleDeleteClick = () => {
        deleteTask();
    }

    const displayDate = dateObj => {
        if (dateObj) {
            const today = new Date();
            const tomorrow = date.addDays(today, 1);
            const format = "DD MMM";
            const todayString = date.format(today, format);
            const tomorrowString = date.format(tomorrow, format);
            const dateObjString = date.format(dateObj, format);
            if (todayString === dateObjString) {
                return "Today";
            } else if (tomorrowString === dateObjString) {
                return "Tomorrow";
            } else if (today.getFullYear() !== dateObj.getFullYear()) {
                return dateObjString + " " + dateObj.getFullYear();
            } else {
                return dateObjString;
            }
        }
    }

    return (
        <div className="taskitem">
            {!openThisEdit &&
                <div className="taskitem-container">
                    <Checkbox status={status_of_completion} updateStatus={updateStatus} />
                    <div className="taskitem-content-wrapper">
                        <div className="taskitem-desc">{description}</div>
                        <div className="taskitem-details">
                            {date_and_time && <span className="taskitem-date">
                                {displayDate(date_and_time)}
                            </span>}
                            {read_time && <span className="taskitem-time">
                                {date.format(date_and_time, "hh:mm")}
                            </span>}
                            {folder && <span className="taskitem-folder">{folder}</span>}
                        </div>
                    </div>
                    <div className="more" onClick={handleClickMore} ref={more}>
                        <div className="icon-more">
                            <div className="circle"></div>
                        </div>
                        {menuIsOpen && <ul className="context-menu pos-right">
                            <li className="edit-button" onClick={handleClickEdit}>Edit</li>
                            <li onClick={handleDeleteClick}>Delete</li>
                        </ul>}
                    </div>
                </div>
            }
            {openThisEdit && <EditTask data={props.data} />}
        </div>
    )
}

export default TaskItem;