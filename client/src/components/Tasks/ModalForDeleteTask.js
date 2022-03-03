import Modal from "../Modals/Modal";
import deleteTask from "../../fetch/deleteTask";

const ModalForDeleteTask = ({ id, description, setIsModalOpen }) => {

    return <Modal buttonList={[
        {
            title: "Close",
            design: "outlined",
            onClick: () => setIsModalOpen(false)
        }, {
            title: "Delete",
            onClick: () => {
                deleteTask(id);
                setIsModalOpen(false);
            }
        }
    ]}>
        Delete task <b>{description}</b>?
    </Modal>
}

export default ModalForDeleteTask;