import Icon from "./Icon";

const TaskNavItem = props => {
    const { leftIcon, rightIcon } = props;
    return (
        <div className="tasknav-item">
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
        </div>
    )
}

export default TaskNavItem;