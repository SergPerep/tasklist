import Button from "./Button";
import DateAndTimePicker from "./Pickers/DateAndTimePicker";
import ProjectPicker from "./Pickers/ProjectPicker";
import { DateAndTimePickerContext } from "./Pickers/DateAndTimePickerContext";
import { useContext, useState } from "react";
import { TasklistContext } from "./TasklistContext";


const EditTask = () => {
    const { considerTime, selectedDate } = useContext(DateAndTimePickerContext);
    const { getTasks } = useContext(TasklistContext);
    const [taskInputValue, setTaskInputValue] = useState();
    const handleSubmitTask = async (e) => {
        e.preventDefault();
        try {
            const body = {
                description: taskInputValue,
                date_and_time: selectedDate.toISOString(),
                read_time: considerTime,
                folder_id: undefined
            }
            const addTask = await fetch("http://localhost:5000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const message = await addTask.json();
            getTasks();
            console.log(message);
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <form className="edittask" onSubmit={handleSubmitTask} id="edittask">
            <div className="edit-fields">
                <input className="taskinput" type="text" placeholder="Task discription" onChange={e => setTaskInputValue(e.target.value)} />
                <div className="picker-container">
                    <DateAndTimePicker />
                    <ProjectPicker />
                </div>
            </div>
            <div className="button-container">
                <Button tag="button" type="submit" value="Submit">Add Task</Button>
                <Button design="outlined">Close</Button>
            </div>
        </form>
    )
}

export default EditTask;