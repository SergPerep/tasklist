import Modal from "./Modal";
import deleteProject from "../../fetch/deleteProject";
import useStore from "../../store/useStore";

const ModalDeleteProject = ({ setIsModalOpen }) => {
    const selectSection = useStore(state => state.selectSection);
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
                selectSection("inb");
            }
        }]}>
            Delete project <b>{selectedSection.name}</b>?
        </Modal>
    )
}

export default ModalDeleteProject;