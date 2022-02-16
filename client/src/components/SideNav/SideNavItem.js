import ColorDisplay from "../BasicUI/ColorDisplay";
import Icon from "../BasicUI/Icon";

const SideNavItem = props => {
    const { leftIcon, rightIcon, onClick, selected, count, onRightIconClick, color } = props;
    return (
        <div className={`sidenav-item ${selected ? "selected" : ""}`} onClick={onClick}>
                {leftIcon &&
                    <div className="sidenav-icon left-icon">
                        <Icon name={leftIcon} size={"md"} />
                    </div>
                }
                {color && <ColorDisplay color={color} />}
                <div className="sidenav-desc">
                    {props.children}
                </div>
                {rightIcon &&
                    <div className="sidenav-icon right-icon" onClick={onRightIconClick}>
                        <Icon name={rightIcon} size={"md"} />
                    </div>
                }
                {count > 0 &&
                    <div className="sidenav-count">
                        {count}
                    </div>
                }
            </div>
    )
}

export default SideNavItem;