import { useContext, useState } from "react";
import { useClickOutside } from "../CustomHooks";
import Icon from "../Icon";
import MenuItem from "../Menus/MenuItem";
import { ProjectPickerContext } from "./ProjectPickerContext";
import { DatabaseContext } from "../DatabaseContext";
import ColorDisplay from "../ColorDisplay";

const ProjectPicker = () => {
    const { projects, colors } = useContext(DatabaseContext);
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

    const domNode = useClickOutside(() => {
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
                    <ColorDisplay
                        color={colors.find(color => color.id === selectedProject.color_id).label}
                        size="sm"
                    />
                    <div className="project-desc">{selectedProject.name}</div>
                </>}
            </div>
            {openProjectMenu &&
                <div className="project-menu" ref={domNode}>
                    <MenuItem iconName="Inbox" onClick={handleClickInbox}>Inbox</MenuItem>
                    {projects.map(project => <MenuItem
                        color={colors.find(color => color.id === project.color_id).label}
                        key={project.id}
                        onClick={() => handleClickMenuItem(project.id)}>
                        {project.name}
                    </MenuItem>)}
                </div>}
        </div>
    )
}

export default ProjectPicker;