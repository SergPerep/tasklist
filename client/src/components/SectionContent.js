import TaskList from "./TaskList";
import Header from "./Header";
import AddTaskInput from "./AddTaskInput";
import { useContext, useState } from "react";
import { ProjectsContext } from "./ProjectsContext";
import Modal from "./Modal";
import Input from "./Input";
import { today, tomorrow } from "./TodayTomorrowVars";

const SectionContent = props => {
    const { selectedNavItem, setSelectedNavItem } = props.data;
    const { projects, deleteProject, updateProject } = useContext(ProjectsContext);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [showCompleted, setShowCompleted] = useState(true);
    const [inputProjectNameValue, setInputProjectNameValue] = useState("");

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
                        <AddTaskInput currDate={today} />
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
                        <AddTaskInput currDate={tomorrow}/>
                        <TaskList currSection="Tomorrow" showCompleted={showCompleted} />
                    </>
                )
            }
        } else if (typeof selectedNavItem === "number") {
            const project = projects.find(x => x.id === selectedNavItem);
            return (
                <>
                    <Header menuList={[{
                        title: "Edit",
                        iconName: "No",
                        onClick: () => {
                            setOpenEditModal(true);
                            setInputProjectNameValue(project.name);
                        }
                    }, {
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
                        }, {
                            title: "Delete",
                            onClick: () => {
                                setOpenDeleteModal(false);
                                setSelectedNavItem("Inbox");
                                deleteProject(project.id);
                            }
                        }]}>
                            Delete project <b>{project.name}</b>?
                        </Modal>
                    }
                    {openEditModal &&
                        <Modal buttonList={[{
                            title: "Close",
                            design: "outlined",
                            onClick: () => {
                                setOpenEditModal(false);
                            }
                        }, {
                            title: "Save",
                            disabled: inputProjectNameValue ? false : true,
                            onClick: () => {
                                updateProject(project.id, inputProjectNameValue);
                                setOpenEditModal(false);
                            }
                        }]}>
                            <h2>{`Edit project «${project.name}»`}</h2>
                            <Input
                                label="Name"
                                value={inputProjectNameValue}
                                onChange={e => { setInputProjectNameValue(e.target.value) }} />
                        </Modal>
                    }
                    <AddTaskInput currProject={project}/>
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