import { KeyboardEventHandler, useState } from "react";
import { useClickOutside } from "../CustomHooks";
import Icon from "../BasicUI/Icon";
import MenuItem from "../Menus/MenuItem";
import ColorDisplay from "../BasicUI/ColorDisplay";
import { useActions, useStore } from "src/store";
import React from "react";

const ProjectPicker = () => {
    const sections = useStore(state => state.sections);
    const pickedProjectId = useStore(state => state.pickedProjectId);
    const pickedSection = sections.find(section => section.id === pickedProjectId);
    const setPickedProjectId = useActions(actions => actions.setPickedProjectId);

    const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);

    const handleClickMenuItem = (id: string | number) => {
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
    const handleEnterProjectDisplay: KeyboardEventHandler = e => {
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
                        colorStr={pickedSection.colorVal}
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
                            colorStr={project.colorVal}
                            key={project.id}
                            onClick={() => handleClickMenuItem(project.id)}>
                            {project.name}
                        </MenuItem>)}
                </div>}
        </div>
    )
}

export default ProjectPicker;