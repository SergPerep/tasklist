import { useState, useEffect } from "react";
import ModalAddNewProject from "../Modals/ModalAddNewProject";
import DefaultSectionItem from "./DefaultSectionItem";
import ProjectItem from "./ProjectItem";
import NewProjectButton from "./NewProjectButton";
import Spinner from "../BasicUI/Spinner";
import { useActions, useStore } from "src/store";
import React from "react";

const SideNav = () => {
    const sections = useStore(state => state.sections);
    const setSelectedSectionId = useActions(actions => actions.setSelectedSectionId);
    const closeEdits = useActions(actions => actions.closeEdits);
    const [openProjects] = useState(() => {
        if (localStorage.getItem("openProjects") === null) return true;
        return localStorage.getItem("openProjects") === "true" ? true : false
    });
    const [isModalAddProjectOpen, setIsModalAddProjectOpen] = useState(false);

    const isSideNavLoaderVisible = useStore(state => state.isSideNavLoaderVisible);

    const isScreenSmall = useStore(state => state.isScreenSmall);
    const setIsSideNavOpened = useActions(actions => actions.setIsSideNavOpened);

    useEffect(() => {
        localStorage.setItem("openProjects", openProjects.toString());
    }, [openProjects]);

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
                    .map(section => {
                        if (typeof section.id !== "number") return
                        return <ProjectItem
                            count={section.tasksNum}
                            onClick={() => {
                                setSelectedSectionId(section.id);
                                closeEdits();
                                if (isScreenSmall) setIsSideNavOpened(false);
                            }}
                            selected={section.selected}
                            key={section.id}
                            projectId={section.id}
                            colorStr={section?.colorVal}>
                            {section.name}
                        </ProjectItem>
                    })}
                <NewProjectButton />
            </div>

        </>
    )
}

export default SideNav;