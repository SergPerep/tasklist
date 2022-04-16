import Modal from "./Modal";
import Input from "../BasicUI/Input";
import Select from "../BasicUI/Select";
import ColorDisplay from "../BasicUI/ColorDisplay";
import Icon from "../BasicUI/Icon";
import { ChangeEventHandler, useState } from "react";
import updateProject from "../../fetch/updateProject";
import { useStore, useActions } from "../../store";
import React from "react";
import { Color } from "../../types";

type ModalEditProjectArgs = {
    setIsModalOpen: (booleanVal: boolean) => void,
    projectId: number
}

const ModalEditProject = ({ setIsModalOpen, projectId }: ModalEditProjectArgs) => {
    const sections = useStore(state => state.sections);
    const project = sections
        .filter(section => section?.isAProject)
        .find(section => section?.id === projectId);
    const colors = useStore(state => state.colors);
    const getColor = useStore(state => state.getColor);
    const [selectedColor, setSelectedColor] = useState<Color>(getColor(colors, project?.colorId));
    const [inputProjectNameValue, setInputProjectNameValue] = useState(project ? project.name : "");

    const isScreenSmall = useStore(state => state.isScreenSmall);
    const setIsSideNavOpened = useActions(state => state.setIsSideNavOpened);

    const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputProjectNameValue(e.target.value)
    }

    return <Modal buttonList={[{
        title: "Close",
        design: "outlined",
        disabled: false,
        onClick: () => {
            setIsModalOpen(false);
        }
    }, {
        title: "Save",
        disabled: inputProjectNameValue?.trim() ? false : true,
        onClick: () => {
            updateProject(project?.id, inputProjectNameValue, selectedColor.id);
            setIsModalOpen(false);
            if (isScreenSmall) setIsSideNavOpened(false);
        }
    }]}>
        <h2>{`Edit project «${project?.name}»`}</h2>
        <Input
            label="Name"
            value={inputProjectNameValue}
            maxLength={100}
            onChange={handleChangeInput} />
        <Select
            label="Color"
            selectList={colors.map(color => {
                return {
                    title: color.name,
                    color: color.value,
                    selected: selectedColor.id === color.id,
                    onClick: () => {
                        setSelectedColor(color);
                    }
                }
            })}>
            <div className="select-display-color">
                <ColorDisplay colorStr={selectedColor.value} size="md" />
                <div className="select-display-color-name">{selectedColor?.name}</div>
                <Icon name="AngleDown" size="sm" />
            </div>
        </Select>
    </Modal>
}

export default ModalEditProject;