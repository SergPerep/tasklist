import Icon from "../Icon";

const ProjectPicker = () => {
    return (
        <div className="project-picker">
            <div className="project-display">
                <Icon name="Folder" size="sm" />
                <div className="project-desc">Folder</div>
            </div>
            <div className="project-menu"></div>
        </div>
    )
}

export default ProjectPicker;