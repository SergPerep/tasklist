import Icon from "../BasicUI/Icon";

const NewProjectButton = () => {
    const handleClickButton = () => {

    }
    return <div className="new-project-btn" onClick={handleClickButton}>
        <Icon size="md" name="Plus" />
        <div className="desc"> New project</div>
    </div>
}

export default NewProjectButton;