import Modal from "./Modal";
import deleteProject from "../../fetch/deleteProject";
import useSectionsStore from "../../stores/useSectionsStore";

const ModalDeleteProject = ({ setIsModalOpen }) => {
    const selectSection = useSectionsStore(state => state.select);
    const selectedSection = useSectionsStore(state => state.sections.getSelectedSection());

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