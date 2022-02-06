import Button from "./BasicUI/Button";
import DateAndTimePicker from "./Pickers/DateAndTimePicker";
import ProjectPicker from "./Pickers/ProjectPicker";
import { DateAndTimePickerContext } from "./Pickers/DateAndTimePickerContext";
import { useContext, useEffect, useState } from "react";
import date from "date-and-time";
import getTasks from "../fetch/getTasks";
import useStore from "../store/useStore";


const EditTask = props => {
    const { id, description, date_and_time, read_time, folder } = props.data || {};
    const { btnName = "Save" } = props;
    const { considerTime, setConsiderTime, selectedDate, setSelectedDate, setTimeDisplay } = useContext(DateAndTimePickerContext);
    
    const pickedProjectId = useStore(state => state.pickedProjectId);
    const setPickedProject = useStore(state => state.setPickedProject)
    const projects = useStore(state => state.projects);
    const [taskInputValue, setTaskInputValue] = useState("");
    const closeEdits = useStore(state => state.closeEdits);

    useEffect(() => {
        loadDataToEditFields();
    }, []);


    const handleSubmitTask = async (e) => {
        e.preventDefault();
        if (props.data) {
            // Update new task with PUT method
            const body = {
                description: taskInputValue,
                date_and_time: selectedDate ? date.format(selectedDate, "YYYY-MM-DD HH:mm:ss") : undefined,
                read_time: considerTime,
                folder_id: pickedProjectId
            }

            const editTask = await fetch(`/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const message = await editTask.json();
            console.log(message);
            getTasks();
            resetEditFields();
            closeEdits();
        } else {
            // Add new task with POST method
            try {
                const body = {
                    description: taskInputValue,
                    date_and_time: selectedDate ? date.format(selectedDate, "YYYY-MM-DD HH:mm:ss") : undefined,
                    read_time: considerTime,
                    folder_id: pickedProjectId
                }
                const addTask = await fetch("/tasks", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                });
                const message = await addTask.json();
                console.log(message);
                getTasks();
                resetEditFields();
                closeEdits();
            } catch (error) {
                console.error(error.message);
            }
        }
    }

    const resetEditFields = () => {
        setTaskInputValue(""); // Clear input
        setConsiderTime(undefined); // Reset time
        setSelectedDate(undefined); // Reset date
        setPickedProject(undefined); // Reset project
        setTimeDisplay(undefined); // Clear time display
    }



    const loadDataToEditFields = () => {
        if (props.data) {
            if (description) {
                setTaskInputValue(description);
            }
            if (date_and_time) {
                setSelectedDate(date_and_time);
            }
            if (read_time) {
                setConsiderTime(true);
                setTimeDisplay(date.format(date_and_time, "H:mm"));
            }
            if (folder.id) {
                setPickedProject({
                    id: projects.find(x => x.id === folder.id) ? projects.find(x => x.id === folder.id).id : undefined,
                    name: folder.name,
                    color_id: projects.find(project => project.id === folder.id) ? projects.find(project => project.id === folder.id).color_id : undefined
                });
            }
        }
    }

    const handleClickClose = () => {
        closeEdits();
        resetEditFields();
    }

    return (
        <form className="edittask" onSubmit={handleSubmitTask} id="edittask">
            <div className="edit-fields">
                <input autoFocus className="taskinput" type="text" placeholder="Task discription" onChange={e => setTaskInputValue(e.target.value)} value={taskInputValue} />
                <div className="picker-container">
                    <DateAndTimePicker />
                    <ProjectPicker />
                </div>
            </div>
            <div className="button-container">
                <Button tag="button" type="submit" value="Submit" disabled={!taskInputValue} >{btnName}</Button>
                <Button design="outlined" onClick={handleClickClose}>Close</Button>
            </div>
        </form>
    )
}

export default EditTask;