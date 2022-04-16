import React from "react";
import Spinner from "../BasicUI/Spinner";

const LoadingScreen = () => {
    return <div className="overlay loading-screen-overlay">
        <Spinner size="lg" />
    </div>
}

export default LoadingScreen;