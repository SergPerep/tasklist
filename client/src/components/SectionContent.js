import TaskList from "./TaskList";
import Header from "./Header";
import AddTaskInput from "./AddTaskInput";
import { useContext } from "react";
import { ProjectsContext } from "./ProjectsContext";

const SectionContent = props => {
    const { selectedSection } = props.data;
    const { projects } = useContext(ProjectsContext);
    const buildContent = () => {
        if (typeof selectedSection === "string") {
            if (selectedSection.toLocaleLowerCase() === "inbox") {
                return (
                    <>
                        <Header title="Inbox"></Header>
                        <AddTaskInput />
                        <TaskList filter="Inbox"/>
                    </>
                )
            } else if (selectedSection.toLocaleLowerCase() === "today") {
                return (
                    <>
                        <Header title="Today"></Header>
                        <AddTaskInput />
                        <TaskList filter="Today" />
                    </>
                )
            } else if (selectedSection.toLocaleLowerCase() === "tomorrow") {
                return (
                    <>
                        <Header title="Tomorrow"></Header>
                        <AddTaskInput />
                        <TaskList filter="Tomorrow"/>
                    </>
                )
            }
        } else if (typeof selectedSection === "number") {
            const project = projects.find(x => x.id === selectedSection);
            return (
                <>
                    <Header title={project.name}></Header>
                    <AddTaskInput />
                    <TaskList filter={project.name}/>
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