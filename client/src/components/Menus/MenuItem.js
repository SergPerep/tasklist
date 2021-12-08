import ColorDisplay from "../ColorDisplay";
import Icon from "../Icon";

const MenuItem = props => {
    const { iconName, color, selected } = props;
    const onClick = props.onClick;
    return (
        <div className={`menu-item ${selected ? "selected" : ""}`} onClick={onClick}>

            {iconName && <div className="menu-icon-left">
                <Icon name={iconName} size="md" />
            </div>}

            {color && <ColorDisplay color={color} />}
            <div className="menu-item-title">{props.children}</div>
            {selected && <div className="menu-icon-right">
                <Icon name="Check" size="md" />
            </div>}
        </div>
    )
}

export default MenuItem;