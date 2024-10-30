import Modal from "../Modals/Modal";
import deleteTask from "../../fetch/deleteTask";
import React from "react";

type ModalForDeleteTaskArgs = { 
    id: number, 
    description: string, 
    setIsModalOpen: (boolVal: boolean) => void
}

const ModalForDeleteTask = ({ id, description, setIsModalOpen }: ModalForDeleteTaskArgs) => {

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