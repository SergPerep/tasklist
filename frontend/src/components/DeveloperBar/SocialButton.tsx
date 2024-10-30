import React, { KeyboardEventHandler } from "react";
import Icon from "../BasicUI/Icon";
type SocialButtonArgs = {
    iconName: string,
    title: string,
    url: string
}

const SocialButton = ({ iconName, title, url }: SocialButtonArgs) => {
    const handleClickButton = () => {
        window.open(url, "_blank");
    }
    const handleEnterButton: KeyboardEventHandler = (e) => {
        if (e.key !== "Enter") return;
        handleClickButton();
        e.preventDefault();
    }
    return <div className="social-button" onClick={handleClickButton} onKeyDown={handleEnterButton} tabIndex={0}>
        <Icon size={"sm"} name={iconName} />
        <span>{title}</span>
    </div>
}

export default SocialButton;