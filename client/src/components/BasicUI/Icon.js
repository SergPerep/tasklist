// Names for icons are in LineIcons.css

const Icon = ({ size, name }) => {
    const isTodayMd = name === "Today" && size === "md";
    return (
        <>
            {isTodayMd && <div className={`line-icon icon-${name}-${size} icon-${size}`}>
                <div className="icon-today">{(new Date()).getDate()}</div>
            </div>}
            {!isTodayMd &&
                <div className={`line-icon icon-${name}-${size} icon-${size}`}></div>
            }
        </>
    )
}

export default Icon;
