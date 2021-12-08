const EmptyState = props => {
    const { title, desc } = props;
    return <div className="empty-state">
        <div className="illust-wrapper">
            {props.children}
        </div>
        <div className="empty-state-title">{title}</div>
        <div className="empty-state-desc">{desc}</div>
    </div>
}

export default EmptyState;