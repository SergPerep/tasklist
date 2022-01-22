const HreflessLink = props => {
    const { onClick } = props;
    return <button
        onClick={onClick}
        className="hrefless-link">
        {props.children}
    </button>
}

export default HreflessLink;