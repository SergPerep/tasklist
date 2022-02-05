import Modal from "./Modal";
import Input from "../BasicUI/Input";
import Select from "../BasicUI/Select";
import ColorDisplay from "../BasicUI/ColorDisplay";
import Icon from "../BasicUI/Icon";
import { useState } from "react";
import updateProject from "../../fetch/updateProject";
import useStore from "../../store/useStore";

const ModalEditProject = ({ setIsModalOpen }) => {
    const colors = useStore(state => state.colors);
    const selectedSection = useStore(state => state.sections.getSelectedSection());
    const project = selectedSection.isAProject ? selectedSection : null;
    const [selectedColor, setSelectedColor] = useState(selectedSection?.color);
    const [inputProjectNameValue, setInputProjectNameValue] = useState(selectedSection?.name);

    console.log({ selectedColor });

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