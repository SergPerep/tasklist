import Modal from "../Modals/Modal";
import deleteTask from "../../fetch/deleteTask";
import getTasks from "../../fetch/getTasks";
import useStore from "../../store/useStore";

const ModalForDeleteTask = ({ id, description, setIsModalOpen }) => {

    const setTasks = useStore(state => state.setTasks);
    
    return <Modal buttonList={[{
        title: "Delete",
        onClick: () => {
            deleteTask(id).then(getTasks(result => setTasks(result)));
            setIsModalOpen(false);
        }
    },
    {
        title: "Close",
        design: "outlined",
        onClick: () => setIsModalOpen(false)
    }]}>
        Delete task <b>{description}</b>?
    </Modal>
}

export default ModalForDeleteTask;