import TaskList from "./TaskList";
import Header from "./Header";
import AddTaskInput from "./AddTaskInput";
import { useContext, useState } from "react";
import { ProjectsContext } from "./ProjectsContext";
import Modal from "./Modal";

const SectionContent = props => {
    const { selectedNavItem } = props.data;
    const { projects } = useContext(ProjectsContext);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [showCompleted, setShowCompleted] = useState(true);
    const deleteProject = async (id) => {
        try {
            const delProject = await fetch(`http://localhost:5000/folders/${id}`, {
                method: "DELETE"
            });
            const message = await delProject.json();
            console.log(message);
        } catch (error) {
            console.error(error.message);
        }
    }
    const buildContent = () => {
        if (typeof selectedNavItem === "string") {
            if (selectedNavItem.toLocaleLowerCase() === "inbox") {
                return (
                    <>
                        <Header menuList={[{
                            title: showCompleted ? "Hide completed" : "Show completed",
                            iconName: "Checkbox",
                            onClick: () => {
                                setShowCompleted(!showCompleted);
                            }
                        }]}>Inbox</Header>
                        <AddTaskInput />
                        <TaskList currSection="Inbox" showCompleted={showCompleted} />
                    </>
                )
            } else if (selectedNavItem.toLocaleLowerCase() === "today") {
                return (
                    <>
                        <Header menuList={[{
                            title: showCompleted ? "Hide completed" : "Show completed",
                            iconName: "Checkbox",
                            onClick: () => {
                                setShowCompleted(!showCompleted);
                            }
                        }]}>Today</Header>
                        <AddTaskInput />
                        <TaskList currSection="Today" showCompleted={showCompleted} />
                    </>
                )
            } else if (selectedNavItem.toLocaleLowerCase() === "tomorrow") {
                return (
                    <>
                        <Header menuList={[{
                            title: showCompleted ? "Hide completed" : "Show completed",
                            iconName: "Checkbox",
                            onClick: () => {
                                setShowCompleted(!showCompleted);
                            }
                        }]}>Tomorrow</Header>
                        <AddTaskInput />
                        <TaskList currSection="Tomorrow" showCompleted={showCompleted} />
                    </>
                )
            }
        } else if (typeof selectedNavItem === "number") {
            const project = projects.find(x => x.id === selectedNavItem);
            return (
                <>
                    <Header menuList={[{
                        title: "Delete",
                        iconName: "No",
                        onClick: () => {
                            setOpenDeleteModal(true);
                        }
                    }, {
                        title: showCompleted ? "Hide completed" : "Show completed",
                        iconName: "Checkbox",
                        onClick: () => {
                            setShowCompleted(!showCompleted);
                        }
                    }]}>{project.name}
                    </Header>
                    {openDeleteModal &&
                        <Modal buttonList={[{
                            title: "Close",
                            design: "outlined",
                            onClick: () => {
                                setOpenDeleteModal(false);
                            }
                        },{
                            title: "Delete",
                            onClick: () => {
                                deleteProject(project.id);
                                window.location = "/";
                            }
                        }]}>
                            Delete project <b>{project.name}</b>?
                        </Modal>
                    }
                    <AddTaskInput />
                    <TaskList currSection={project.id} showCompleted={showCompleted} />
                </>
            )
        }
    }
    return (
        <>
            {buildContent()}
        </>
    )
}

export default SectionContent;