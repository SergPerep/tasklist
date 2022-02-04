import ColorDisplay from "../BasicUI/ColorDisplay";
import Icon from "../BasicUI/Icon";

export default props => {
    const { leftIcon, rightIcon, onClick, selected, count, onRightIconClick, color } = props;
    return (
        <div className={`tasknav-item ${selected ? "selected" : ""}`} onClick={onClick}>
                {leftIcon &&
                    <div className="tasknav-icon left-icon">
                        <Icon name={leftIcon} size={"md"} />
                    </div>
                }
                {color && <ColorDisplay color={color} />}
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
    )
}