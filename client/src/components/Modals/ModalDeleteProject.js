import Modal from "./Modal";
import deleteProject from "../../fetch/deleteProject";
import useStore from "../../store/useStore";

const ModalDeleteProject = ({ setIsModalOpen, projectId }) => {
    const sections = useStore(state => state.sections);
    const project = sections
        .filter(section => section?.isAProject)
        .find(section => section?.id === projectId);
    const setSelectedSectionId = useStore(state => state.setSelectedSectionId);

    const isScreenSmall = useStore(state => state.isScreenSmall);
    const setIsSideNavOpened = useStore(state => state.setIsSideNavOpened);

    return (
        <Modal buttonList={[{
            title: "Close",
            design: "outlined",
            onClick: () => {
                setIsModalOpen(false);
            }
        }, {
            title: "Delete",
            onClick: () => {
                setIsModalOpen(false);
                if (!project.isAProject) return;
                deleteProject(project.id);
                setSelectedSectionId("inb");
                if (isScreenSmall) setIsSideNavOpened(false);
            }
        }]}>
            Delete project <b>{project.name}</b>?
        </Modal>
    )
}

export default ModalDeleteProject;