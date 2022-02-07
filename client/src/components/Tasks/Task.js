import React, { useState } from "react";
import Checkbox from "../BasicUI/Checkbox";
import date from "date-and-time";
import { useClickOutside } from "../CustomHooks";
import EditTask from "../EditTask";
import { today } from "../../utils/days";
import displayDate from "../../utils/displayDate";
import Icon from "../BasicUI/Icon";
import useStore from "../../store/useStore";
import MenuForTask from "./MenuForTask";
import ModalForDeleteTask from "./ModalForDeleteTask";

const Task = ({ task }) => {
    const { id, description, status_of_completion, date_and_time, read_time, folder } = task;
    const sections = useStore(state => state.sections);
    const project = sections
        .filter(section => section.isAProject)
        .find(project => project.id === folder.id);

    const openedEditId = useStore(state => state.openedEditId);
    const isThisEditOpened = openedEditId === id;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isTaskOverdue = date_and_time?.getTime() < today.getTime();
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
        <div className={"taskitem " + (isTaskOverdue ? "overdue " : "") + (status_of_completion ? "completed" : "")}>
            {!isThisEditOpened &&
                <div className="taskitem-container">
                    <Checkbox id={id} isCompleted={status_of_completion} />
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
                                style={{ backgroundColor: project?.color?.fill, color: project?.color?.font }}>
                                {folder.name}
                            </span>}
                        </div>
                    </div>
                    <div className="more" onClick={handleClickMore} ref={more}>
                        <Icon name="More" size="md" />
                        {isMenuOpen && <MenuForTask id={id} setIsMenuOpen={setIsModalOpen} />}
                    </div>
                </div>
            }
            {isThisEditOpened && <EditTask task={task} />}
            {isModalOpen && <ModalForDeleteTask
                id={id}
                description={description}
                setIsModalOpen={setIsModalOpen}
            />}
        </div>
    )
}

export default Task;