import Input from "../BasicUI/Input";
import Select from "../BasicUI/Select";
import Modal from "./Modal";
import ColorDisplay from "../BasicUI/ColorDisplay";
import Icon from "../BasicUI/Icon";
import { ChangeEventHandler, useState } from "react";
import useStore from "../../store/useStore";
import addProject from "../../fetch/addProject";
import React from "react";

type ModalAddNewProjectArgs = {
    setIsModalOpen: (bl: boolean) => void
}

const ModalAddNewProject = ({ setIsModalOpen }: ModalAddNewProjectArgs) => {
    const [inputAddProjectValue, setInputAddProjectValue] = useState("");
    const setSelectedSectionId = useStore(state => state.setSelectedSectionId);
    const colors = useStore(state => state.colors);
    const getColor = useStore(state => state.getColor);
    const [selectedColorId, setSelectedColorId] = useState<number | null>(null);

    const isScreenSmall = useStore(state => state.isScreenSmall);
    const setIsSideNavOpened = useStore(state => state.setIsSideNavOpened);

    const handleClickAdd = () => {
        addProject(inputAddProjectValue, selectedColorId, (folderId: number) => {
            setInputAddProjectValue("");
            setSelectedColorId(null);
            setSelectedSectionId(folderId);
            setIsModalOpen(false);
            if (isScreenSmall) setIsSideNavOpened(false);
        })
    }
    const handleClickClose = () => {
        setIsModalOpen(false)
        setInputAddProjectValue("");
        setSelectedColorId(null);
    }
    
    const handleChangeInput: ChangeEventHandler<HTMLInputElement> = e => {
        setInputAddProjectValue(e.target.value)
    }

    return (
        <Modal buttonList={[{
            title: "Close",
            design: "outlined",
            onClick: handleClickClose,
            disabled: false
        }, {
            title: "Add",
            disabled: inputAddProjectValue.trim() ? false : true,
            onClick: handleClickAdd
        }]}>
            <h2>Add project</h2>
            <Input
                label="Name"
                value={inputAddProjectValue}
                autoFocus
                maxLength={100}
                onChange={handleChangeInput} />
            <Select
                label="Color"
                selectList={colors.map(color => {
                    return {
                        title: color.name,
                        color: color.value,
                        selected: selectedColorId === color.id,
                        onClick: () => {
                            if (color.id) setSelectedColorId(color.id);
                        }
                    }
                })}>
                <div className="select-display-color">
                    <ColorDisplay color={getColor(selectedColorId).value} size="md"/>
                    <div className="select-display-color-name">{getColor(selectedColorId).name}</div>
                    <Icon name="AngleDown" size="sm" />
                </div>
            </Select>
        </Modal>
    )
}

export default ModalAddNewProject;


