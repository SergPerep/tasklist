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
    const sections = useStore(state => state.sections);
    const setSelectedSection = useStore(state => state.setSelectedSection);
    const colors = useStore(state => state.colors);
    const getColor = useStore(state => state.getColor);
    const [selectedColor, setSelectedColor] = useState(null);
    return (
        <Modal buttonList={[{
            title: "Close",
            design: "outlined",
            onClick: () => {
                setIsModalOpen(false)
                setInputAddProjectValue("");
                setSelectedColor(null)
            }
        }, {
            title: "Add",
            disabled: inputAddProjectValue ? false : true,
            onClick: () => {
                const folderPromise = addProject(inputAddProjectValue, selectedColor);
                folderPromise.then((folder) => {
                    const id = folder.id;
                    setSelectedSection(id);
                    setIsModalOpen(false);
                    setInputAddProjectValue("");
                    setSelectedColor(null);
                });
            }
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
                        selected: selectedColor === color.id,
                        onClick: () => {
                            setSelectedColor(color.id);
                        }
                    }
                })}>
                <div className="select-display-color">
                    <ColorDisplay color={getColor(selectedColor).label} />
                    <div className="select-display-color-name">{getColor(selectedColor).name}</div>
                    <Icon name="AngleDown" size="sm" />
                </div>
            </Select>
        </Modal>
    )
}

export default ModalAddNewProject;


