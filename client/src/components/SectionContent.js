import TaskList from "./TaskList";
import Header from "./Header";
import AddTaskInput from "./AddTaskInput";
import { useContext } from "react";
import { ProjectsContext } from "./ProjectsContext";

const SectionContent = props => {
    const { selectedNavItem } = props.data;
    const { projects } = useContext(ProjectsContext);
    const buildContent = () => {
        if (typeof selectedNavItem === "string") {
            if (selectedNavItem.toLocaleLowerCase() === "inbox") {
                return (
                    <>
                        <Header title="Inbox"></Header>
                        <AddTaskInput />
                        <TaskList currSection="Inbox"/>
                    </>
                )
            } else if (selectedNavItem.toLocaleLowerCase() === "today") {
                return (
                    <>
                        <Header title="Today"></Header>
                        <AddTaskInput />
                        <TaskList currSection="Today" />
                    </>
                )
            } else if (selectedNavItem.toLocaleLowerCase() === "tomorrow") {
                return (
                    <>
                        <Header title="Tomorrow"></Header>
                        <AddTaskInput />
                        <TaskList currSection="Tomorrow"/>
                    </>
                )
            }
        } else if (typeof selectedNavItem === "number") {
            const project = projects.find(x => x.id === selectedNavItem);
            return (
                <>
                    <Header title={project.name}></Header>
                    <AddTaskInput />
                    <TaskList currSection={project.id}/>
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