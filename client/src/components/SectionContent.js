import TaskList from "./Tasks/TaskList";
import Header from "./Header";
import AddTaskInput from "./Tasks/AddTaskInput";
import { useEffect, useState } from "react";
import useStore from "../store/useStore";
import ModalDeleteProject from "./Modals/ModalDeleteProject";
import ModalEditProject from "./Modals/ModalEditProject";

const SectionContent = () => {
    const sections = useStore(state => state.sections);
    const selectedSectionId = useStore(state => state.selectedSectionId);
    const selectedSection = sections.find(section => section.selected);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const isShowCompletedTasks = useStore(state => state.isShowCompletedTasks);
    const setIsShowCompletedTasks = useStore(state => state.setIsShowCompletedTasks);

    // console.log({selectedSection})
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
        <Header menuList={selectedSection?.isAProject ? contextMenuListForAProject : contextMenuListForNotAProjectSection}>
            {selectedSection?.name}
        </Header>
        {isDeleteModalOpen &&
            <ModalDeleteProject setIsModalOpen={setIsDeleteModalOpen} projectId={selectedSectionId} />
        }
        {isEditModalOpen &&
            <ModalEditProject setIsModalOpen={setIsEditModalOpen} projectId={selectedSectionId} />
        }
        <AddTaskInput />
        <TaskList />
    </>
}

export default SectionContent;