import React from "react";

type SpinnerArgs = {
    size?: "md" | "sm" | "lg"
}

const Spinner = ({ size = "md" }: SpinnerArgs) => {
    return <svg className={`spinner ${size}`} version="1.1" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48">
        <g className="spinner-group">
            <circle className="spinner-line" cy="24" cx="24" />
        </g>
    </svg>
}

export default Spinner;