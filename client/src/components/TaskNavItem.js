import Icon from "./Icon";

const TaskNavItem = props => {
    const { leftIcon, rightIcon, onClick, selected, count, onRightIconClick } = props;
    return (
        <div className={`tasknav-item ${selected ? "selected" : ""}`} onClick={onClick}>
            <div className="taskboard-sidenav-container">
                {leftIcon &&
                    <div className="tasknav-icon left-icon">
                        <Icon name={leftIcon} size={"md"} />
                    </div>
                }
                <div className="tasknav-desc">
                    {props.children}
                </div>
                {rightIcon &&
                    <div className="tasknav-icon right-icon" onClick={onRightIconClick}>
                        <Icon name={rightIcon} size={"md"} />
                    </div>
                }
                {count > 0 &&
                    <div className="tasknav-count">
                        {count}
                    </div>
                }
            </div>
        </div>
    )
}

export default TaskNavItem;