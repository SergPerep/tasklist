import Icon from "../BasicUI/Icon";

const DefaultSectionItem = props => {
    const { leftIcon, onClick, selected, count } = props;
    return <div className={`sidenav-item ${selected ? "selected" : ""}`} onClick={onClick}>
        <div className="sidenav-icon left-icon">
            <Icon name={leftIcon} size={"md"} />
        </div>
        <div className="sidenav-desc">
            {props.children}
        </div>
        {count > 0 &&
            <div className="sidenav-count">
                {count}
            </div>
        }
    </div>
}

export default DefaultSectionItem;