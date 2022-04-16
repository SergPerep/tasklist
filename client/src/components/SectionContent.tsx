import TaskList from "./Tasks/TaskList";
import Header from "./Header";
import AddTaskInput from "./Tasks/AddTaskInput";
import { useEffect, useState } from "react";
import ModalDeleteProject from "./Modals/ModalDeleteProject";
import ModalEditProject from "./Modals/ModalEditProject";
import Spinner from "./BasicUI/Spinner";
import { useActions, useStore } from "src/store";
import React from "react";

const SectionContent = () => {
    const sections = useStore(state => state.sections);
    const selectedSectionId = useStore(state => state.selectedSectionId);
    const isSelectedSectionAProject = typeof selectedSectionId === "number";
    const selectedSection = sections.find(section => section.selected);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const isShowCompletedTasks = useStore(state => state.isShowCompletedTasks);
    const setIsShowCompletedTasks = useActions(actions => actions.setIsShowCompletedTasks);

    const isTaskListLoaderVisible = useStore(state => state.isTaskListLoaderVisible);

    // console.log({selectedSection})
    useEffect(() => {
        localStorage.setItem("isShowCompletedTasks", isShowCompletedTasks.toString());
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
        {isDeleteModalOpen && isSelectedSectionAProject &&
            <ModalDeleteProject
                setIsModalOpen={setIsDeleteModalOpen}
                projectId={selectedSectionId} />
        }
        {isEditModalOpen && isSelectedSectionAProject &&
            <ModalEditProject
                setIsModalOpen={setIsEditModalOpen}
                projectId={selectedSectionId} />
        }
        <AddTaskInput />
        {isTaskListLoaderVisible && <div className="tasklist-loader"><Spinner /></div>}
        {!isTaskListLoaderVisible && <TaskList />}
    </>
}

export default SectionContent;