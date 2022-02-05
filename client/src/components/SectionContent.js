import TaskList from "./Tasks/TaskList";
import Header from "./Header";
import AddTaskInput from "./AddTaskInput";
import { useEffect, useState } from "react";
import useStore from "../store/useStore";
import ModalDeleteProject from "./Modals/ModalDeleteProject";
import ModalEditProject from "./Modals/ModalEditProject";

const SectionContent = () => {
    const selectedSection = useStore(state => state.getSelectedSection());
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const isShowCompletedTasks = useStore(state => state.isShowCompleted);
    const setIsShowCompletedTasks = useStore(state => state.setShowCompleted);

    useEffect(() => {
        localStorage.setItem("isShowCompletedTasks", isShowCompletedTasks);
    }, [isShowCompletedTasks]);

    const contextMenuListForNotAProjectSection = [{
        title: isShowCompletedTasks ? "Hide\xa0completed" : "Show\xa0completed",
        iconName: "Checkbox",
        onClick: () => setIsShowCompletedTasks(!isShowCompletedTasks)
    }];

    const contextMenuListForAProject = [{
        title: isShowCompletedTasks ? "Hide\xa0completed" : "Show\xa0completed",
        iconName: "Checkbox",
        onClick: () => {
            setIsShowCompletedTasks(!isShowCompletedTasks)
        }
    }, {
        title: "Edit",
        iconName: "Edit",
        onClick: () => {
            setIsEditModalOpen(true);
        }
    }, {
        title: "Delete",
        iconName: "Delete",
        onClick: () => {
            setIsDeleteModalOpen(true);
        }
    }];

    return <>
        <Header menuList={selectedSection.isAProject ? contextMenuListForAProject : contextMenuListForNotAProjectSection}>
            {selectedSection.name}
        </Header>
        {isDeleteModalOpen &&
            <ModalDeleteProject setIsModalOpen={setIsDeleteModalOpen} />
        }
        {isEditModalOpen &&
            <ModalEditProject setIsModalOpen={setIsEditModalOpen} />
        }
        <AddTaskInput />
        <TaskList />
    </>
}

export default SectionContent;