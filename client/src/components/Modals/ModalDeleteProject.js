import Modal from "./Modal";
import deleteProject from "../../fetch/deleteProject";
import useStore from "../../store/useStore";

const ModalDeleteProject = ({ setIsModalOpen }) => {
    const setSelectedSection = useStore(state => state.setSelectedSection);
    const sections = useStore(state => state.sections);
    const selectedSection = sections.find(section => section.selected);

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
                if (!selectedSection.isAProject) return;
                deleteProject(selectedSection.id);
                setSelectedSection("inb");
            }
        }]}>
            Delete project <b>{selectedSection.name}</b>?
        </Modal>
    )
}

export default ModalDeleteProject;