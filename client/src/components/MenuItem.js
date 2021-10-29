import Icon from "./Icon";

const MenuItem = props => {
    const {iconName} = props;
    const handleClick = props.onClick;
    return (
        <div className="menu-item" onClick={handleClick}>
            {iconName && <Icon name={iconName} size="md"/>}
            <div className="menu-item-title">{props.children}</div>
        </div>
    )
}

export default MenuItem;