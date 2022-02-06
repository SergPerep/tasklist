import { useState, useEffect } from "react";
import SideNavItem from "./SideNavItem";
import date from "date-and-time";
import { today, tomorrow } from "../TodayTomorrowVars";
import useStore from "../../store/useStore";
import ModalAddNewProject from "../Modals/ModalAddNewProject";

const SideNav = () => {
    const sections = useStore(state => state.sections);
    const setSelectedSection = useStore(state => state.setSelectedSection);
    const closeEdits = useStore(state => state.closeEdits);
    const [openProjects, setOpenProjects] = useState(() => {
        if (localStorage.getItem("openProjects") === null) {
            return true
        }
        return localStorage.getItem("openProjects") === "true" ? true : false
    });
    const [isModalAddProjectOpen, setIsModalAddProjectOpen] = useState(false);

    const tasks = useStore(state => state.tasks);

    useEffect(() => {
        localStorage.setItem("openProjects", openProjects);
    }, [openProjects]);


    const handleClickProjects = () => {
        setOpenProjects(!openProjects);
    };

    const handleAddNewProject = e => {
        e.stopPropagation();
        setIsModalAddProjectOpen(true);
    }

    const areThereTomorrowTasks = true && tasks
        ?.find(task => {
            if (!task.status_of_completion) {
                if (task.date_and_time) {
                    return date.isSameDay(task.date_and_time, tomorrow);
                } else return false;
            } else return false;
        });

    return (
        <div className="tasknav">
            {sections
                .filter(section => section.isAProject === false)
                .map(section => <SideNavItem
                    leftIcon={section.leftIcon}
                    count={section.tasksNum}
                    onClick={() => {
                        setSelectedSection(section.id);
                        closeEdits();
                    }}
                    selected={section.selected}
                    key={section.id}
                >
                    {section.name}
                </SideNavItem>
                )
            }
            <button onClick={handleAddNewProject}>New project</button>
            {isModalAddProjectOpen &&
                <ModalAddNewProject setIsModalOpen={setIsModalAddProjectOpen} />
            }
            {sections
                .filter(section => section.isAProject === true)
                .map(section => <SideNavItem
                    count={section.tasksNum}
                    onClick={() => {
                        setSelectedSection(section.id);
                        closeEdits();
                    }}
                    selected={section.selected}
                    key={section.id}
                    color={section?.color?.label}
                >
                    {section.name}
                </SideNavItem>)}
        </div>
    )
}

export default SideNav;