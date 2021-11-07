import React, { useState, useContext } from "react";
import Checkbox from "./Checkbox";
import date from "date-and-time";
import { TasklistContext } from "./TasklistContext";
import { useClickOutside } from "./CustomHooks";
import EditTask from "./EditTask";
import { OpenAndCloseEditContext } from "./OpenAndCloseEditContext";
import { today, tomorrow } from "./TodayTomorrowVars";
import Icon from "./Icon";

const TaskItem = props => {
    const { id, description, status_of_completion, date_and_time, read_time, folder } = props.data;
    const { getTasks } = useContext(TasklistContext);
    const { openEditArr, openOneEditCloseAllOther } = useContext(OpenAndCloseEditContext);
    const openThisEdit = openEditArr.find(x => x.id === id) ? openEditArr.find(x => x.id === id).openEdit : false;
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const isOverdue = date_and_time ? date_and_time.getTime() < today.getTime() && !date.isSameDay(date_and_time, today) : false;

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
            getTasks();
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
        <div className={"taskitem " + (isOverdue ? "overdue " : "") + (status_of_completion ? "completed" : "")}>
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
                                {date.format(date_and_time, "HH:mm")}
                            </span>}
                            {folder.id && <span className="taskitem-folder">{folder.name}</span>}
                        </div>
                    </div>
                    <div className="more" onClick={handleClickMore} ref={more}>
                        <Icon name="More" size="md" />
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