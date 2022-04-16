import React, { KeyboardEventHandler, useState } from "react";
import Checkbox from "../BasicUI/Checkbox";
import { useClickOutside } from "../CustomHooks";
import EditTask from "./EditTask";
import { today } from "../../utils/days";
import Icon from "../BasicUI/Icon";
import MenuForTask from "./MenuForTask";
import ModalForDeleteTask from "./ModalForDeleteTask";
import formatDateString from "../../utils/formatDateString";
import ColorDisplay from "../BasicUI/ColorDisplay";
import { useActions, useStore } from "src/store";
import { Task as TaskType } from "src/types";

type TaskArgs = {
    task: TaskType
}

const Task = ({ task }: TaskArgs) => {
    const sections = useStore(state => state.sections);
    const project = sections
        .filter(section => section.isAProject)
        .find(project => project.id === task.folder.id);

    const openedEditId = useStore(state => state.openedEditId);
    const setOpenedEdit = useActions(actions => actions.setOpenedEdit);
    const isThisEditOpened = openedEditId === task.id;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isTaskOverdue = (new Date(task.dateStr ? task.dateStr : ""))?.getTime() < today.getTime();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handles click outside of «more»
    const more = useClickOutside(() => {
        setIsMenuOpen(false);
    });

    // Handles click on «more»
    const handleClickMore = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handleKeyDownTask: KeyboardEventHandler = e => {
        // console.log(e.key);
        if (e.key === "Enter") {
            e.preventDefault();
            setOpenedEdit(task.id)
        }
    }

    return (
        <div className={"taskitem " + (isTaskOverdue ? "overdue " : "") + (task.isCompleted ? "completed" : "")}>
            {!isThisEditOpened &&
                <div className="taskitem-container" tabIndex={0} onKeyDown={handleKeyDownTask}>
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
                                    {formatDateString(task.dateStr) || null}
                                </div>
                                {task.timeStr && <div className="taskitem-time">
                                    {task.timeStr}
                                </div>}
                            </div>}

                            {task.folder.id && <div className="taskitem-project"
                                style={{ color: project?.colorVal }}>
                                <ColorDisplay size="sm" colorStr={project?.colorVal} />
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