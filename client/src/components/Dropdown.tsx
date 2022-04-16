import React, { MouseEventHandler } from "react";

type Props = {
    name: string,
    onClick: MouseEventHandler,
    children: any
}

const Dropdown = React.forwardRef<HTMLDivElement, Props>(({ name, onClick, children }: Props, ref) => {
    
    return (
        <div className="dropdown" ref={ref}>
            <div className="dropdown-button" onClick={onClick}>
                <span className="dropdown-name">{name}</span>
                <div className="icon-angle"></div>
            </div>
            <div className="dropdown-menu">
                {children}
            </div>
        </div>
    )
})

export default Dropdown;