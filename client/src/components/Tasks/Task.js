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

const Task = ({ task }) => {
    const sections = useStore(state => state.sections);
    const project = sections
        .filter(section => section.isAProject)
        .find(project => project.id === task.folder.id);

    const openedEditId = useStore(state => state.openedEditId);
    const isThisEditOpened = openedEditId === task.id;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isTaskOverdue = (new Date(task.date))?.getTime() < today.getTime();
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
                        <div className="taskitem-desc">{task.description}</div>
                        <div className="taskitem-details">
                            {task.date && <span className="taskitem-date">
                                {formatDateString(task.date)}
                            </span>}
                            {task.time && <span className="taskitem-time">
                                {formatTimeString(task.time)}
                            </span>}
                            {task.folder.id && <span className="taskitem-project"
                                style={{ backgroundColor: project?.color?.fill, color: project?.color?.font }}>
                                {task.folder.name}
                            </span>}
                        </div>
                    </div>
                    <div className="more" onClick={handleClickMore} ref={more}>
                        <Icon name="More" size="md" />
                        {isMenuOpen && <MenuForTask id={task.id} setIsMenuOpen={setIsModalOpen} />}
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