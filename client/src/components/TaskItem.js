import React, { useState, useEffect, useRef, useContext } from "react";
import Checkbox from "./Checkbox";
import date from "date-and-time";
import { TasklistContext } from "./TasklistContext";

const TaskItem = (props) => {
    const { id, description, status_of_completion, date_and_time, read_time, folder } = props.data;
    const {getTasks} = useContext(TasklistContext);

    // HIDE OR OPEN «MORE» MENU //
    const more = useRef();
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    // Detect click outside
    useEffect(() => {
        // Mount EventListener
        document.addEventListener("click", handleClickOutside);
        // Demontage EventListener before rerender
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);

    // Handles click on document
    const handleClickOutside = e => {
        const isClickInside = more.current.contains(e.target);
        // If click outside and menu is open then hide it
        if (!isClickInside) {
            setMenuIsOpen(false);
        }
    }

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

    return (
        <div className="taskitem">
            <Checkbox status={status_of_completion} updateStatus={updateStatus} />
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
            <div className="more" onClick={handleClickMore} ref={more}>
                <div className="icon-more">
                    <div className="circle"></div>
                </div>
                {menuIsOpen && <ul className="context-menu pos-right">
                    <li>Edit</li>
                    <li onClick={handleDeleteClick}>Delete</li>
                </ul>}

            </div>

        </div>
    )
}

export default TaskItem;