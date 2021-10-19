import TaskNavItem from "./TaskNavItem"

const TaskNavList = () => {
    const handleClickInbox = () => {
        
    };
    return (
        <div className="tasknav">
            <TaskNavItem onClick={handleClickInbox}>Inbox</TaskNavItem>
            <TaskNavItem>Today</TaskNavItem>
            <TaskNavItem>Tomorrow</TaskNavItem>
            <TaskNavItem>Calendar</TaskNavItem>
            <TaskNavItem>Projects</TaskNavItem>
        </div>
    )
}

export default TaskNavList;