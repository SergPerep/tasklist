import Modal from "./Modal";
import deleteProject from "../../fetch/deleteProject";
import { useStore, useActions } from "../../store";
import React from "react";

type ModalDeleteProjectArgs = {
    setIsModalOpen: (booleanVal: boolean) => void, 
    projectId: number
}

const ModalDeleteProject = ({ setIsModalOpen, projectId }: ModalDeleteProjectArgs) => {
    const sections = useStore(state => state.sections);
    const project = sections
        .filter(section => section?.isAProject)
        .find(section => section?.id === projectId);
    const setSelectedSectionId = useActions(actions => actions.setSelectedSectionId);

    const isScreenSmall = useStore(state => state.isScreenSmall);
    const setIsSideNavOpened = useActions(actions => actions.setIsSideNavOpened);

    return (
        <Modal buttonList={[{
            title: "Close",
            design: "outlined",
            disabled: false,
            onClick: () => {
                setIsModalOpen(false);
            }
        }, {
            title: "Delete",
            disabled: false,
            onClick: () => {
                setIsModalOpen(false);
                if (!project?.isAProject) return;
                deleteProject(project?.id);
                setSelectedSectionId("inb");
                if (isScreenSmall) setIsSideNavOpened(false);
            }
        }]}>
            Delete project <b>{project?.name}</b>?
        </Modal>
    )
}

export default ModalDeleteProject;