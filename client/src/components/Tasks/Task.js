import React, { useState } from "react";
import Checkbox from "../BasicUI/Checkbox";
import { useClickOutside } from "../CustomHooks";
import EditTask from "./EditTask";
import { today } from "../../utils/days";
import Icon from "../BasicUI/Icon";
import useStore from "../../store/useStore";
import MenuForTask from "./MenuForTask";
import ModalForDeleteTask from "./ModalForDeleteTask";
import formatDateString from "../../utils/formatDateString";
import formatTimeString from "../../utils/formatTimeString";
import ColorDisplay from "../BasicUI/ColorDisplay";

const Task = ({ task }) => {
    const sections = useStore(state => state.sections);
    const project = sections
        .filter(section => section.isAProject)
        .find(project => project.id === task.folder.id);

    const openedEditId = useStore(state => state.openedEditId);
    const setOpenedEdit = useStore(state => state.setOpenedEdit);
    const isThisEditOpened = openedEditId === task.id;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isTaskOverdue = (new Date(task.dateStr))?.getTime() < today.getTime();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handles click outside of «more»
    const more = useClickOutside(() => {
        setIsMenuOpen(false);
    });

    // Handles click on «more»
    const handleClickMore = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className={"taskitem " + (isTaskOverdue ? "overdue " : "") + (task.isCompleted ? "completed" : "")}>
            {!isThisEditOpened &&
                <div className="taskitem-container">
                    <Checkbox id={task.id} isCompleted={task.isCompleted} />
                    <div className="taskitem-content-wrapper">
                        <div className="taskitem-desc"
                        onClick={() => setOpenedEdit(task.id)}
                        >
                            {task.description}
                        </div>
                        <div className="taskitem-details">

                            {task.dateStr && <div className="time-and-date">
                                <Icon size="sm" name="Today" />
                                <div className="taskitem-date">
                                    {formatDateString(task.dateStr)}
                                </div>
                                {task.timeStr && <div className="taskitem-time">
                                    {formatTimeString(task.timeStr)}
                                </div>}
                            </div>}

                            {task.folder.id && <div className="taskitem-project"
                                style={{ color: project?.color?.label }}>
                                <ColorDisplay size="sm" color={project?.color?.label} />
                                <div className="project-desc">
                                    {task.folder.name}
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className="more" onClick={handleClickMore} ref={more}>
                        <Icon name="More" size="md" />
                        {isMenuOpen && <MenuForTask id={task.id} setIsModalOpen={setIsModalOpen} />}
                    </div>
                </div>
            }
            {isThisEditOpened && <EditTask task={task} />}
            {isModalOpen && <ModalForDeleteTask
                id={task.id}
                description={task.description}
                setIsModalOpen={setIsModalOpen}
            />}
        </div>
    )
}

export default Task;