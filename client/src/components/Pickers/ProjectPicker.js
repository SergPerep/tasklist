import { useContext, useEffect, useState } from "react";
import { useClickOutside } from "../CustomHooks";
import Icon from "../Icon";
import MenuItem from "../MenuItem";
import { ProjectPickerContext } from "./ProjectPickerContext";
import { ProjectsContext } from "./ProjectsContext";

const ProjectPicker = () => {
    const {projects, setProjects} = useContext(ProjectsContext);
    const { selectedProject, setSelectedProject } = useContext(ProjectPickerContext);
    const [openProjectMenu, setOpenProjectMenu] = useState(false);

    const handleClickMenuItem = id => {
        const arr = projects.filter(x => x.id === id);
        setSelectedProject(arr[0]);
        setOpenProjectMenu(false);
    }

    const handleClickInbox = () => {
        setSelectedProject(undefined);
        setOpenProjectMenu(false)
    }

    const handleClickProjectDisplay = () => {
        setOpenProjectMenu(true);
    }

    const domNode = useClickOutside(()=>{
        setOpenProjectMenu(false);
    });

    return (
        <div className="project-picker">
            <div className="project-display" onClick={handleClickProjectDisplay}>
                {!selectedProject && <>
                    <Icon name="Inbox" size="sm" />
                    <div className="project-desc">Inbox</div>
                </>}
                {selectedProject && <>
                    <Icon name="Folder" size="sm" />
                    <div className="project-desc">{selectedProject.name}</div>
                </>}
            </div>
            {openProjectMenu &&
                <div className="project-menu" ref={domNode}>
                    <MenuItem iconName="Inbox" onClick={handleClickInbox}>Inbox</MenuItem>
                    {projects.map(project => <MenuItem
                        iconName="Folder"
                        key={project.id}
                        onClick={() => handleClickMenuItem(project.id)}>
                        {project.name}
                    </MenuItem>)}
                </div>}
        </div>
    )
}

export default ProjectPicker;