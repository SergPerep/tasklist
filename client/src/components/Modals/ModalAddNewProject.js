import Input from "../BasicUI/Input";
import Select from "../BasicUI/Select";
import Modal from "./Modal";
import ColorDisplay from "../BasicUI/ColorDisplay";
import Icon from "../BasicUI/Icon";
import { useState } from "react";
import useStore from "../../store/useStore";
import addProject from "../../fetch/addProject";

const ModalAddNewProject = ({ setIsModalOpen }) => {
    const [inputAddProjectValue, setInputAddProjectValue] = useState("");
    const setSelectedSectionId = useStore(state => state.setSelectedSectionId);
    const colors = useStore(state => state.colors);
    const getColor = useStore(state => state.getColor);
    const [selectedColorId, setSelectedColorId] = useState(null);

    const handleClickAdd = () => {
        addProject(inputAddProjectValue, selectedColorId, (folderId) => {
            setInputAddProjectValue("");
            setSelectedColorId(null);
            setSelectedSectionId(folderId);
            setIsModalOpen(false);
        })
    }
    return (
        <Modal buttonList={[{
            title: "Close",
            design: "outlined",
            onClick: () => {
                setIsModalOpen(false)
                setInputAddProjectValue("");
                setSelectedColorId(null)
            }
        }, {
            title: "Add",
            disabled: inputAddProjectValue ? false : true,
            onClick: handleClickAdd
        }]}>
            <h2>Add project</h2>
            <Input
                label="Name"
                value={inputAddProjectValue}
                autoFocus
                onChange={e => { setInputAddProjectValue(e.target.value) }} />
            <Select
                placeholder="New select"
                label="Color"
                selectList={colors.map(color => {
                    return {
                        title: color.name,
                        color: color.label,
                        selected: selectedColorId === color.id,
                        onClick: () => {
                            setSelectedColorId(color.id);
                        }
                    }
                })}>
                <div className="select-display-color">
                    <ColorDisplay color={getColor(selectedColorId).label} />
                    <div className="select-display-color-name">{getColor(selectedColorId).name}</div>
                    <Icon name="AngleDown" size="sm" />
                </div>
            </Select>
        </Modal>
    )
}

export default ModalAddNewProject;


