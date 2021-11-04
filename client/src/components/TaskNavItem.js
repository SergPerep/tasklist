import Icon from "./Icon";

const TaskNavItem = props => {
    const { leftIcon, rightIcon, onClick, selected, count } = props;
    return (
        <div className={`tasknav-item ${selected ? "selected" : ""}`} onClick={onClick}>
            {leftIcon &&
                <div className="tasknav-icon">
                    <Icon name={leftIcon} size={"md"} />
                </div>
            }
            <div className="tasknav-desc">
                {props.children}
            </div>
            {rightIcon &&
                <div className="tasknav-icon">
                    <Icon name={rightIcon} size={"md"} />
                </div>
            }
            {count > 0 &&
                <div className="tasknav-count">
                    {count}
                </div>
            }
        </div>
    )
}

export default TaskNavItem;