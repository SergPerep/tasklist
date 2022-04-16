import React, { MouseEventHandler } from "react";

type HreflessLinkArgs = {
    onClick: MouseEventHandler,
    children: any
}

const HreflessLink = ({ onClick, children }: HreflessLinkArgs) => {
    return <button
        onClick={onClick}
        className="hrefless-link">
        {children}
    </button>
}

export default HreflessLink;