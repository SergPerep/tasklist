import Button from "../BasicUI/Button";
import DateAndTimePicker from "../Pickers/DateAndTimePicker";
import ProjectPicker from "../Pickers/ProjectPicker";
import { useEffect, useState } from "react";
import useStore from "../../store/useStore";
import updateTask from "../../fetch/updateTask";
import addTask from "../../fetch/addTask";
import formatTimeString from "../../utils/formatTimeString";


const EditTask = ({ task, btnName = "Save" }) => {
    // const { id, description, date_and_time, read_time, folder } = task || {};

    const pickedTimeStr = useStore(state => state.pickedTimeStr);
    const setPickedTimeStr = useStore(state => state.setPickedTimeStr);
    const pickedDateStr = useStore(state => state.pickedDateStr);
    const setPickedDate = useStore(state => state.setPickedDate);
    const setTimeDisplay = useStore(state => state.setTimeDisplay);

    const pickedProjectId = useStore(state => state.pickedProjectId);
    const setPickedProjectId = useStore(state => state.setPickedProjectId)
    const [taskInputValue, setTaskInputValue] = useState("");
    const closeEdits = useStore(state => state.closeEdits);

    useEffect(() => {
        if (!task) return
        if (task.description) setTaskInputValue(task.description)
        if (task.date) setPickedDate(task.date)
        if (task.time) {
            setPickedTimeStr(task.time);
            setTimeDisplay(formatTimeString(task.time));
        }
        if (task.folder.id) setPickedProjectId(task.folder.id);
    }, []);

    const handleSubmitTask = (e) => {
        console.log({ pickedTimeStr });
        e.preventDefault();
        if (task) {
            // Update new task with PUT method
            updateTask({ id: task.id, taskInputValue, pickedDateStr, pickedTimeStr, pickedProjectId });
        } else {
            // Add new task with POST method
            addTask({ taskInputValue, pickedDateStr, pickedTimeStr, pickedProjectId })
        }
        resetEditFields();
        closeEdits();
    }

    const resetEditFields = () => {
        setTaskInputValue(""); // Clear input
        setPickedTimeStr(null); // Reset time
        setPickedDate(null); // Reset date
        setPickedProjectId("inb"); // Reset project
        setTimeDisplay(undefined); // Clear time display
    }

    const handleClickClose = () => {
        closeEdits();
        resetEditFields();
    }

    return (
        <form className="edittask" onSubmit={handleSubmitTask} id="edittask">
            <div className="edit-fields">
                <input
                    autoFocus
                    className="taskinput"
                    type="text"
                    placeholder="Task discription"
                    onChange={e => setTaskInputValue(e.target.value)}
                    value={taskInputValue}
                />
                <div className="picker-container">
                    <DateAndTimePicker />
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