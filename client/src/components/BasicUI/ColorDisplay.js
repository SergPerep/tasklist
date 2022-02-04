const ColorDisplay = props => {
    const { color, size } = props;
    return <div className={`color-display ${size}`}>
        <div className="color-spot" style={{backgroundColor: color}}></div>
    </div>
}

export default ColorDisplay;