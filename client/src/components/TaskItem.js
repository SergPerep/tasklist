import React, { useState, useContext } from "react";
import Checkbox from "./Checkbox";
import date from "date-and-time";
import { DatabaseContext } from "./DatabaseContext";
import { useClickOutside } from "./CustomHooks";
import EditTask from "./EditTask";
import { OpenAndCloseEditContext } from "./OpenAndCloseEditContext";
import { today, tomorrow } from "./TodayTomorrowVars";
import Icon from "./Icon";
import Modal from "./Modal";
import Menu from "./Menus/Menu";
import { SnackbarContext } from "./SnackbarContext";

const TaskItem = props => {
    const { id, description, status_of_completion, date_and_time, read_time, folder} = props.data;
    const { getTasks, projects, colors } = useContext(DatabaseContext);
    const { openEditArr, openOneEditCloseAllOther } = useContext(OpenAndCloseEditContext);
    const openThisEdit = openEditArr.find(x => x.id === id) ? openEditArr.find(x => x.id === id).openEdit : false;
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const isOverdue = date_and_time ? date_and_time.getTime() < today.getTime() && !date.isSameDay(date_and_time, today) : false;
    const [openModal, setOpenModal] = useState(false);
    const {runSnackbar} = useContext(SnackbarContext);

    // Define colors for project-tag
    const colorId = projects.find(project => project.id === folder.id) ? projects.find(project => project.id === folder.id).color_id : null;
    const folderColor = colors.find(color => color.id === colorId);
    const colorBG = folderColor.fill;
    const colorFont = folderColor.font;

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
            runSnackbar(response);
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
            runSnackbar(message);
            getTasks();
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleDeleteClick = () => {
        setOpenModal(true);
        /* deleteTask(); */
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
                            {folder.id && <span className="taskitem-project"
                            style={{backgroundColor: colorBG, color: colorFont}}>
                                {folder.name}
                                </span>}
                        </div>
                    </div>
                    <div className="more" onClick={handleClickMore} ref={more}>
                        <Icon name="More" size="md" />
                        
                        {menuIsOpen &&
                            <div className="more-content">
                                <Menu menuList={[{
                                    iconName: "Edit",
                                    title: "Edit",
                                    onClick: handleClickEdit
                                }, {
                                    iconName: "Delete",
                                    title: "Delete",
                                    onClick: handleDeleteClick
                                }]} />
                            </div>
                        }
                    </div>

                </div>
            }
            {openThisEdit && <EditTask data={props.data} />}
            {openModal &&
                <Modal buttonList={[{
                    title: "Delete",
                    onClick: () => {
                        deleteTask();
                        setOpenModal(false);
                    }
                },
                {
                    title: "Close",
                    design: "outlined",
                    onClick: () => setOpenModal(false)
                }]}>
                    Delete task <b>{description}</b>?
                </Modal>
            }
        </div>
    )
}

export default TaskItem;