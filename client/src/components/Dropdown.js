import React from "react";

const Dropdown = React.forwardRef((props, ref) => {
    const name = props.name;
    const handleClickDropdown = props.onClick;
    return (
        <div className="dropdown" ref={ref}>
            <div className="dropdown-button" onClick={handleClickDropdown}>
                <span className="dropdown-name">{name}</span>
                <div className="icon-angle"></div>
            </div>
            <div className="dropdown-menu">
                {props.children}
            </div>
        </div>
    )
})

export default Dropdown;