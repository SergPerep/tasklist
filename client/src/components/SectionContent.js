import TaskList from "./TaskList";
import Header from "./Header";
import AddTaskInput from "./AddTaskInput";
import { useContext, useEffect, useState } from "react";
import { DatabaseContext } from "./DatabaseContext";
import Modal from "./Modal";
import Input from "./Input";
import { today, tomorrow } from "./TodayTomorrowVars";
import Select from "./Select";
import ColorDisplay from "./ColorDisplay";
import Icon from "./Icon";

const SectionContent = () => {
    const { projects, deleteProject, updateProject, colors, selectedColor, setSelectedColor,selectedNavItem, setSelectedNavItem } = useContext(DatabaseContext);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [showCompleted, setShowCompleted] = useState(()=>localStorage.getItem("showCompleted") === "true" ? true : false);
    const [inputProjectNameValue, setInputProjectNameValue] = useState("");

    useEffect(()=>{
        localStorage.setItem("showCompleted", JSON.stringify(showCompleted));
    }, [showCompleted]);


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
                        <AddTaskInput currDate={tomorrow} />
                        <TaskList currSection="Tomorrow" showCompleted={showCompleted} />
                    </>
                )
            }
        } else if (typeof selectedNavItem === "number") {
            const project = projects.find(x => x.id === selectedNavItem);
            return (
                <>
                    <Header menuList={[{
                        title: showCompleted ? "Hide completed" : "Show completed",
                        iconName: "Checkbox",
                        onClick: () => {
                            setShowCompleted(!showCompleted);
                        }
                    }, {
                        title: "Edit",
                        iconName: "Edit",
                        onClick: () => {
                            setOpenEditModal(true);
                            setInputProjectNameValue(project.name);
                            setSelectedColor(colors.find(color => color.id === project.color_id).id);
                        }
                    }, {
                        title: "Delete",
                        iconName: "Delete",
                        onClick: () => {
                            setOpenDeleteModal(true);
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
                                updateProject(project.id, inputProjectNameValue, selectedColor);
                                setOpenEditModal(false);
                            }
                        }]}>
                            <h2>{`Edit project «${project.name}»`}</h2>
                            <Input
                                label="Name"
                                value={inputProjectNameValue}
                                onChange={e => { setInputProjectNameValue(e.target.value) }} />
                            <Select
                                placeholder="New select"
                                label="Color"
                                selectList={colors.map(color => {
                                    return {
                                        title: color.name,
                                        color: color.label,
                                        selected: selectedColor === color.id,
                                        onClick: () => {
                                            setSelectedColor(color.id);
                                        }
                                    }
                                })}>
                                <div className="select-display-color">
                                    <ColorDisplay color={colors.find(color => color.id === selectedColor).label} />
                                    <div className="select-display-color-name">{colors.find(color => color.id === selectedColor).name}</div>
                                    <Icon name="AngleDown" size="sm" />
                                </div>
                            </Select>
                        </Modal>
                    }
                    <AddTaskInput currProject={project} />
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