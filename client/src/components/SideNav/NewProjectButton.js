import { useState } from "react";
import Icon from "../BasicUI/Icon";
import ModalAddNewProject from "../Modals/ModalAddNewProject";

const NewProjectButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleClickButton = () => {
        setIsModalOpen(true);
    }
    return <>
        <div className="new-project-btn" onClick={handleClickButton}>
            <Icon size="md" name="Plus" />
            <div className="desc"> New project</div>
        </div>
        {isModalOpen &&
            <ModalAddNewProject setIsModalOpen={setIsModalOpen} />
        }
    </>
}

export default NewProjectButton;