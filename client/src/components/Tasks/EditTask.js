import Button from "../BasicUI/Button";
import DTPicker from "../Pickers/DTPicker";
import ProjectPicker from "../Pickers/ProjectPicker";
import { useEffect, useState } from "react";
import useStore from "../../store/useStore";
import updateTask from "../../fetch/updateTask";
import addTask from "../../fetch/addTask";


const EditTask = ({ task, btnName = "Save" }) => {
    const pickedTimeStr = useStore(state => state.pickedTimeStr);
    const setPickedTimeStr = useStore(state => state.setPickedTimeStr);
    const pickedDateStr = useStore(state => state.pickedDateStr);
    const setPickedDateStr = useStore(state => state.setPickedDateStr);

    const pickedProjectId = useStore(state => state.pickedProjectId);
    const setPickedProjectId = useStore(state => state.setPickedProjectId)
    const [taskInputValue, setTaskInputValue] = useState("");
    const closeEdits = useStore(state => state.closeEdits);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (!task) return
        if (task.description) setTaskInputValue(task.description)
        if (task.dateStr) setPickedDateStr(task.dateStr)
        if (task.timeStr) setPickedTimeStr(task.timeStr);
        if (task.folder.id) setPickedProjectId(task.folder.id);
    }, []);

    const handleSubmitTask = e => {
        e.preventDefault();
        if (task) {
            // Update new task with PUT method
            updateTask({
                id: task.id,
                description: taskInputValue,
                dateStr: pickedDateStr,
                timeStr: pickedTimeStr,
                projectId: pickedProjectId
            });
        } else {
            // Add new task with POST method
            addTask({
                description: taskInputValue,
                dateStr: pickedDateStr,
                timeStr: pickedTimeStr,
                projectId: pickedProjectId
            })
        }
        resetEditFields();
        closeEdits();
    }

    const resetEditFields = () => {
        setTaskInputValue(""); // Clear input
        setPickedTimeStr(""); // Reset time
        setPickedDateStr(""); // Reset date
        setPickedProjectId("inb"); // Reset project
    }

    const handleClickClose = () => {
        closeEdits();
        resetEditFields();
    }

    return (
        <form className="edittask" onSubmit={handleSubmitTask} id="edittask">
            <div className={`edit-fields ${isFocused ? "focused" : ""}`}>
                <input
                    className="taskinput"
                    type="text"
                    placeholder="Task discription"
                    onChange={e => setTaskInputValue(e.target.value)}
                    value={taskInputValue}
                    autoFocus
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <div className="picker-container">
                    <DTPicker />
                    <ProjectPicker />
                </div>
            </div>
            <div className="button-container">
                <Button tag="button" type="submit" value="Submit" disabled={!taskInputValue}>{btnName}</Button>
                <Button design="outlined" onClick={handleClickClose}>Close</Button>
            </div>
        </form>
    )
}

export default EditTask;