import { useContext, useState, useEffect } from "react";
import { DatabaseContext } from "./DatabaseContext";
import TaskNavItem from "./TaskNavItem";
import date from "date-and-time";
import { today, tomorrow } from "./TodayTomorrowVars";
import { OpenAndCloseEditContext } from "./OpenAndCloseEditContext";
import { useSpring, animated } from "react-spring";
import { useHeight } from "./CustomHooks";
import Modal from "./Modal";
import Input from "./Input";
import Select from "./Select";
import ColorDisplay from "./ColorDisplay";
import Icon from "./Icon";

const TaskNavList = props => {
    const [openProjects, setOpenProjects] = useState(()=>{
        if(localStorage.getItem("openProjects") === null) {
            return true
        }
        return localStorage.getItem("openProjects") === "true" ? true : false
    });
    console.log(localStorage.getItem("openProjects"))
    const { selectedNavItem, setSelectedNavItem } = props.data;
    const { taskList, projects, addProject, colors, selectedColor, setSelectedColor } = useContext(DatabaseContext);
    const { closeAllEdits } = useContext(OpenAndCloseEditContext);
    const [openModalAddProject, setOpenModalAddProject] = useState(false);
    const [inputAddProjectValue, setInputAddProjectValue] = useState("");

    const [ref, height] = useHeight();
    const animRoll = useSpring({
        from: {
            height: height,
            opacity: 1
        },
        to: {
            height: openProjects ? height : 0,
            opacity: openProjects ? 1 : 0
        }
    });
    
    useEffect(() => {
        localStorage.setItem("openProjects", openProjects);
    }, [openProjects]);

    
    const handleClickProjects = () => {
        setOpenProjects(!openProjects);
    };

    const handleAddNewProject = e => {
        e.stopPropagation();
        setOpenModalAddProject(true);
        setSelectedColor(null);
    }

    const areThereTomorrowTasks = true && taskList
        .find(task => {
            if (!task.status_of_completion) {
                if (task.date_and_time) {
                    return date.isSameDay(task.date_and_time, tomorrow);
                } else return false;
            } else return false;
        });
    return (
        <div className="tasknav">
            <TaskNavItem
                leftIcon="Inbox"
                count={taskList.filter(task => !task.status_of_completion && !task.folder.id).length}
                onClick={() => {
                    setSelectedNavItem("Inbox");
                    closeAllEdits();
                }}
                selected={typeof selectedNavItem === "string" && selectedNavItem.toLowerCase() === "inbox"}>
                Inbox
            </TaskNavItem>
            <TaskNavItem
                leftIcon="Today"
                count={taskList.filter(task => !task.status_of_completion && task.date_and_time && (today.getTime() > task.date_and_time.getTime() || date.isSameDay(task.date_and_time, today))).length}
                onClick={() => {
                    setSelectedNavItem("Today");
                    closeAllEdits();
                }}
                selected={typeof selectedNavItem === "string" && selectedNavItem.toLowerCase() === "today"}>
                Today
            </TaskNavItem>
            {areThereTomorrowTasks &&
                <TaskNavItem
                    leftIcon="Tomorrow"
                    count={taskList.filter(task => !task.status_of_completion && task.date_and_time && date.isSameDay(task.date_and_time, tomorrow)).length}
                    onClick={() => {
                        setSelectedNavItem("Tomorrow");
                        closeAllEdits();
                    }}
                    selected={typeof selectedNavItem === "string" && selectedNavItem.toLowerCase() === "tomorrow"}>
                    Tomorrow
                </TaskNavItem>
            }
            {/*<TaskNavItem leftIcon="Calendar">Calendar</TaskNavItem>*/}
            <div className="projects-header">
                <TaskNavItem
                    leftIcon={openProjects ? "AngleDown" : "AngleRight"}
                    rightIcon="Plus"
                    onClick={handleClickProjects}
                    onRightIconClick={handleAddNewProject}>
                    Projects
                </TaskNavItem>
                {openModalAddProject &&
                    <Modal buttonList={[{
                        title: "Close",
                        design: "outlined",
                        onClick: () => {
                            setOpenModalAddProject(false);
                            setInputAddProjectValue("");
                        }
                    }, {
                        title: "Add",
                        disabled: inputAddProjectValue ? false : true,
                        onClick: () => {
                            const folderPromise = addProject(inputAddProjectValue, selectedColor);
                            folderPromise.then((folder)=>{
                               const id = folder.id;
                               setSelectedNavItem(id);
                               setOpenModalAddProject(false);
                               setInputAddProjectValue("");
                            });
                        }
                    }]}>
                        <h2>Add project</h2>
                        <Input
                            label="Name"
                            value={inputAddProjectValue}
                            onChange={e => { setInputAddProjectValue(e.target.value) }} />
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
            </div>
            <animated.div className="projects-container" style={animRoll}>
                <div className="projects-content" ref={ref}>
                    {projects.map(project => <TaskNavItem
                        color={colors.find(color => color.id === project.color_id) ? colors.find(color => color.id === project.color_id).label : null}
                        key={project.id}
                        count={taskList.filter(task => !task.status_of_completion && task.folder.id && task.folder.name === project.name).length}
                        onClick={() => {
                            setSelectedNavItem(project.id);
                            closeAllEdits();
                        }}
                        selected={typeof selectedNavItem === "number" && selectedNavItem === project.id}>
                        {project.name}
                    </TaskNavItem>)}
                </div>
            </animated.div>
        </div>
    )
}

export default TaskNavList;