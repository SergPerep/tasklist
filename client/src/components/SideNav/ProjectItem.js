import ColorDisplay from "../BasicUI/ColorDisplay";
import Icon from "../BasicUI/Icon";

const ProjectItem = props => {
    const { onClick, selected, count, color } = props;
    return (
        <div className={`sidenav-item ${selected ? "selected" : ""}`} onClick={onClick}>
            {color && <ColorDisplay color={color} />}
            <div className="sidenav-desc">
                {props.children}
            </div>
            {count > 0 &&
                <div className="sidenav-count">
                    {count}
                </div>
            }
        </div>
    )
}

export default ProjectItem;