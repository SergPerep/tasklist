import Button from "../BasicUI/Button";
import DateAndTimePicker from "../Pickers/DateAndTimePicker";
import ProjectPicker from "../Pickers/ProjectPicker";
import { useEffect, useState } from "react";
import date from "date-and-time";
import useStore from "../../store/useStore";
import updateTask from "../../fetch/updateTask";
import addTask from "../../fetch/addTask";


const EditTask = ({ task, btnName = "Save" }) => {
    const { id, description, date_and_time, read_time, folder } = task || {};

    const considerTime = useStore(state => state.considerTime);
    const setConsiderTime = useStore(state => state.setConsiderTime);
    const selectedDate = useStore(state => state.selectedDate);
    const setSelectedDate = useStore(state => state.setSelectedDate);
    const setTimeDisplay = useStore(state => state.setTimeDisplay);

    const pickedProjectId = useStore(state => state.pickedProjectId);
    const setPickedProjectId = useStore(state => state.setPickedProjectId)
    const [taskInputValue, setTaskInputValue] = useState("");
    const closeEdits = useStore(state => state.closeEdits);

    useEffect(() => {
        if (!task) return
        if (description) setTaskInputValue(description)
        if (date_and_time) setSelectedDate(date_and_time)
        if (read_time) {
            setConsiderTime(true);
            setTimeDisplay(date.format(date_and_time, "H:mm"));
        }
        if (folder.id) setPickedProjectId(folder.id);
    }, []);


    const handleSubmitTask = (e) => {
        e.preventDefault();
        if (task) {
            // Update new task with PUT method
            updateTask({ id, taskInputValue, selectedDate, considerTime, pickedProjectId });
        } else {
            // Add new task with POST method
            addTask({ taskInputValue, selectedDate, considerTime, pickedProjectId })
        }
        resetEditFields();
        closeEdits();
    }

    const resetEditFields = () => {
        setTaskInputValue(""); // Clear input
        setConsiderTime(undefined); // Reset time
        setSelectedDate(undefined); // Reset date
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