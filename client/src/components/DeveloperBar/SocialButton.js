import Icon from "../BasicUI/Icon";
const SocialButton = ({ iconName, title, url }) => {
    const handleClickButton = () => {
        window.open(url, "_blank");
    }
    const handleEnterButton = e => {
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