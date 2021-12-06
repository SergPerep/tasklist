const ColorDisplay = props => {
    const { color } = props;
    return <div className="color-display">
        <div className="color-spot" style={{backgroundColor: color}}></div>
    </div>
}

export default ColorDisplay;