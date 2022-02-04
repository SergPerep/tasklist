import TaskList from "./Tasks/TaskList";
import Header from "./Header";
import AddTaskInput from "./AddTaskInput";
import { useEffect, useState } from "react";
import useSectionsStore from "../stores/useSectionsStore";
import useTasksStore from "../stores/useTasksStore";
import ModalDeleteProject from "./Modals/ModalDeleteProject";
import ModalEditProject from "./Modals/ModalEditProject";

const SectionContent = () => {
    const selectedSection = useSectionsStore(state => state.sections.getSelectedSection());
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const isShowCompletedTasks = useTasksStore(state => state.isShowCompleted);
    const setIsShowCompletedTasks = useTasksStore(state => state.setShowCompleted);

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