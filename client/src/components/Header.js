const Header = props => {
    const {title} = props;
    return (
        <div className="header">
            <h1>{title}</h1>
            <div className="button-container">{props.children}</div>
        </div>
    )
}

export default Header;