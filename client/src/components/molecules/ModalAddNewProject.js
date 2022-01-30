import Input from "../atoms/Input";
import Select from "../Select";
import Modal from "./Modal";
import ColorDisplay from "../ColorDisplay";
import Icon from "../Icon";
import { useState } from "react";
import useSectionsStore from "../store/useSectionsStore";
import useColorsStore from "../store/useColorsStore";
import addProject from "../fetch/addProject"

const ModalAddNewProject = props => {
    const { isModalOpen, setIsModalOpen } = props;
    const [inputAddProjectValue, setInputAddProjectValue] = useState("");
    const selectSection = useSectionsStore(state => state.select);
    const colors = useColorsStore(state => state.colors);
    const [selectedColor, setSelectedColor] = useState(null);
    return <>
        {isModalOpen && <Modal buttonList={[{
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
                    selectSection(id);
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
                selectList={colors.list.map(color => {
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
                    <ColorDisplay color={colors.getColor(selectedColor).label} />
                    <div className="select-display-color-name">{colors.getColor(selectedColor).name}</div>
                    <Icon name="AngleDown" size="sm" />
                </div>
            </Select>

        </Modal>}
    </>
}

export default ModalAddNewProject;


