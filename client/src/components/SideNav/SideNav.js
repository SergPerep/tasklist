import { useState, useEffect } from "react";
import date from "date-and-time";
import { tomorrow } from "../../utils/days";
import useStore from "../../store/useStore";
import ModalAddNewProject from "../Modals/ModalAddNewProject";
import DefaultSectionItem from "./DefaultSectionItem";
import ProjectItem from "./ProjectItem";
import NewProjectButton from "./NewProjectButton";
import Spinner from "../BasicUI/Spinner";

const SideNav = () => {
    const sections = useStore(state => state.sections);
    const setSelectedSectionId = useStore(state => state.setSelectedSectionId);
    const closeEdits = useStore(state => state.closeEdits);
    const [openProjects, setOpenProjects] = useState(() => {
        if (localStorage.getItem("openProjects") === null) return true;
        return localStorage.getItem("openProjects") === "true" ? true : false
    });
    const [isModalAddProjectOpen, setIsModalAddProjectOpen] = useState(false);

    const isSideNavLoaderVisible = useStore(state => state.isSideNavLoaderVisible);

    const tasks = useStore(state => state.tasks);

    const isScreenSmall = useStore(state => state.isScreenSmall);
    const setIsSideNavOpened = useStore(state => state.setIsSideNavOpened);

    useEffect(() => {
        localStorage.setItem("openProjects", openProjects);
    }, [openProjects]);

    const areThereTomorrowTasks = true && tasks
        ?.find(task => {
            if (!task.status_of_completion) {
                if (task.date_and_time) {
                    return date.isSameDay(task.date_and_time, tomorrow);
                } else return false;
            } else return false;
        });

    return (
        <>

            <div className="sidenav">
                {sections
                    .filter(section => section.isAProject === false)
                    .map(section => <DefaultSectionItem
                        leftIcon={section.leftIcon}
                        count={section.tasksNum}
                        onClick={() => {
                            setSelectedSectionId(section.id);
                            closeEdits();
                            if (isScreenSmall) setIsSideNavOpened(false);
                        }}
                        selected={section.selected}
                        key={section.id}
                    >
                        {section.name}
                    </DefaultSectionItem>
                    )
                }
                <div className="divider"></div>
                {isModalAddProjectOpen &&
                    <ModalAddNewProject setIsModalOpen={setIsModalAddProjectOpen} />
                }
                {isSideNavLoaderVisible && <Spinner />}
                {sections
                    .filter(section => section.isAProject === true)
                    .map(section => <ProjectItem
                        count={section.tasksNum}
                        onClick={() => {
                            setSelectedSectionId(section.id);
                            closeEdits();
                            if (isScreenSmall) setIsSideNavOpened(false);
                        }}
                        selected={section.selected}
                        key={section.id}
                        projectId={section.id}
                        color={section?.color?.value}
                    >
                        {section.name}
                    </ProjectItem>)}
                <NewProjectButton />
            </div>

        </>
    )
}

export default SideNav;