import Modal from "./Modal";
import Input from "../BasicUI/Input";
import Select from "../BasicUI/Select";
import ColorDisplay from "../BasicUI/ColorDisplay";
import Icon from "../BasicUI/Icon";
import { useState } from "react";
import updateProject from "../../fetch/updateProject";
import useStore from "../../store/useStore";

const ModalEditProject = ({ setIsModalOpen, projectId }) => {
    const sections = useStore(state => state.sections);
    const project = sections
        .filter(section => section?.isAProject)
        .find(section => section?.id === projectId);
    const colors = useStore(state => state.colors);
    const [selectedColor, setSelectedColor] = useState(project?.color);
    const [inputProjectNameValue, setInputProjectNameValue] = useState(project?.name);

    const isScreenSmall = useStore(state => state.isScreenSmall);
    const setIsSideNavOpened = useStore(state => state.setIsSideNavOpened);

    return <Modal buttonList={[{
        title: "Close",
        design: "outlined",
        onClick: () => {
            setIsModalOpen(false);
        }
    }, {
        title: "Save",
        disabled: inputProjectNameValue ? false : true,
        onClick: () => {
            updateProject(project.id, inputProjectNameValue, selectedColor.id);
            setIsModalOpen(false);
            if (isScreenSmall) setIsSideNavOpened(false);
        }
    }]}>
        <h2>{`Edit project «${project?.name}»`}</h2>
        <Input
            label="Name"
            value={inputProjectNameValue}
            onChange={e => { setInputProjectNameValue(e.target.value) }} />
        <Select
            placeholder="New select"
            label="Color"
            selectList={colors.map(color => {
                return {
                    title: color.name,
                    color: color.label,
                    selected: selectedColor.id === color.id,
                    onClick: () => {
                        setSelectedColor(color);
                    }
                }
            })}>
            <div className="select-display-color">
                <ColorDisplay color={selectedColor?.label} />
                <div className="select-display-color-name">{selectedColor?.name}</div>
                <Icon name="AngleDown" size="sm" />
            </div>
        </Select>
    </Modal>
}

export default ModalEditProject;