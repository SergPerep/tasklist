import Modal from "./Modal";
import deleteProject from "../../fetch/deleteProject";
import useStore from "../../store/useStore";

const ModalDeleteProject = ({ setIsModalOpen }) => {
    const selectSection = useStore(state => state.select);
    const selectedSection = useStore(state => state.getSelectedSection());

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