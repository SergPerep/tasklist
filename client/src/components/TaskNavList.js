import TaskNavItem from "./TaskNavItem"

const TaskNavList = () => {
    const handleClickInbox = () => {
        
    };
    return (
        <div className="tasknav">
            <TaskNavItem leftIcon="Inbox" onClick={handleClickInbox}>Inbox</TaskNavItem>
            <TaskNavItem leftIcon="Today">Today</TaskNavItem>
            <TaskNavItem leftIcon="Tomorrow">Tomorrow</TaskNavItem>
            <TaskNavItem leftIcon="Calendar">Calendar</TaskNavItem>
            <TaskNavItem leftIcon="Folder" rightIcon="Plus">Projects</TaskNavItem>
        </div>
    )
}

export default TaskNavList;