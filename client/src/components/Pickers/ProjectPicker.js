import { useState } from "react";
import { useClickOutside } from "../CustomHooks";
import Icon from "../BasicUI/Icon";
import MenuItem from "../Menus/MenuItem";
import ColorDisplay from "../BasicUI/ColorDisplay";
import useStore from "../../store/useStore";

const ProjectPicker = () => {

    const sections = useStore(state => state.sections);
    const pickedProjectId = useStore(state => state.pickedProjectId);
    const pickedSection = sections.find(section => section.id === pickedProjectId);
    const setPickedProjectId = useStore(state => state.setPickedProjectId);

    const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);

    const handleClickMenuItem = id => {
        setPickedProjectId(id);
        setIsProjectMenuOpen(false);
    }

    const handleClickInbox = () => {
        setPickedProjectId("inb");
        setIsProjectMenuOpen(false)
    }

    const handleClickProjectDisplay = () => {
        setIsProjectMenuOpen(true);
    }
    const handleEnterProjectDisplay = e => {
        if (e.key !== "Enter") return;
        setIsProjectMenuOpen(true);
        e.preventDefault();
    }

    const domNode = useClickOutside(() => {
        setIsProjectMenuOpen(false);
    });

    return (
        <div className="project-picker">
            <div className="project-display" onClick={handleClickProjectDisplay} onKeyDown={handleEnterProjectDisplay} tabIndex={0}>
                {!pickedSection?.isAProject && <>
                    <Icon name="Inbox" size="sm" />
                    <div className="project-desc">Inbox</div>
                </>}
                {pickedSection?.isAProject && <>
                    <ColorDisplay
                        color={pickedSection.color.value}
                        size="sm"
                    />
                    <div className="project-desc">{pickedSection.name}</div>
                </>}
            </div>
            {isProjectMenuOpen &&
                <div className="project-menu" ref={domNode}>
                    <MenuItem iconName="Inbox" onClick={handleClickInbox}>Inbox</MenuItem>
                    {sections
                        .filter(section => section.isAProject)
                        .map(project => <MenuItem
                            color={project.color?.value}
                            key={project.id}
                            onClick={() => handleClickMenuItem(project.id)}>
                            {project.name}
                        </MenuItem>)}
                </div>}
        </div>
    )
}

export default ProjectPicker;