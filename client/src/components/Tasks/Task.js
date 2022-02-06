import React, { useState } from "react";
import Checkbox from "../BasicUI/Checkbox";
import date from "date-and-time";
import { useClickOutside } from "../CustomHooks";
import EditTask from "../EditTask";
import { today, tomorrow } from "../../utils/days";
import Icon from "../BasicUI/Icon";
import Modal from "../Modals/Modal";
import Menu from "../Menus/Menu";
import getTasks from "../../fetch/getTasks";
import useStore from "../../store/useStore";

const Task = props => {
    const { id, description, status_of_completion, date_and_time, read_time, folder } = props.data;
    const projects = useStore(state => state.projects);
    const colors = useStore(state => state.colors);
    const setTasks = useStore(state => state.setTasks);

    const openedEditId = useStore(state => state.openedEditId);
    const isThisEditOpened = openedEditId === id;
    const setOpenedEdit = useStore(state => state.setOpenedEdit);

    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const isOverdue = date_and_time ? date_and_time.getTime() < today.getTime() && !date.isSameDay(date_and_time, today) : false;
    const [openModal, setOpenModal] = useState(false);

    // Define colors for project-tag
    const colorId = projects.find(project => project.id === folder.id) ? projects.find(project => project.id === folder.id).color_id : null;
    const folderColor = colors.find(color => color.id === colorId);
    const colorBG = folderColor ? folderColor.fill : null;
    const colorFont = folderColor ? folderColor.font : null;

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
            const updateCheckStatus = await fetch(`/tasks/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const response = await updateCheckStatus.json();
            console.log(response);

            getTasks().then(data => setTasks(data));
        } catch (error) {
            console.error(error.message);
        }
    }


    const handleClickEdit = () => {
        setOpenedEdit(id);
    }


    const deleteTask = async () => {
        try {
            const delTask = await fetch(`/tasks/${id}`, {
                method: "DELETE"
            });
            const message = await delTask.json();
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
            {!isThisEditOpened &&
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
                                style={{ backgroundColor: colorBG, color: colorFont }}>
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
            {isThisEditOpened && <EditTask data={props.data} />}
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

export default Task;