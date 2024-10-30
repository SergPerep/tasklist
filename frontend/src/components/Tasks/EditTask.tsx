import Button from "../BasicUI/Button";
import DTPicker from "../Pickers/DTPicker";
import ProjectPicker from "../Pickers/ProjectPicker";
import { FormEventHandler, KeyboardEventHandler, useEffect, useState } from "react";
import updateTask from "../../fetch/updateTask";
import addTask from "../../fetch/addTask";
import { useActions, useStore } from "src/store";
import { Task } from "../../types";
import React from "react";

type EditTaskArgs = {
    task?: Task,
    btnName?: string
}

const EditTask = ({ task, btnName = "Save" }: EditTaskArgs) => {
    const pickedTimeStr = useStore(state => state.pickedTimeStr);
    const setPickedTimeStr = useActions(actions => actions.setPickedTimeStr);
    const pickedDateStr = useStore(state => state.pickedDateStr);
    const setPickedDateStr = useActions(actions => actions.setPickedDateStr);

    const pickedProjectId = useStore(state => state.pickedProjectId);
    const setPickedProjectId = useActions(actions => actions.setPickedProjectId)
    const [taskInputValue, setTaskInputValue] = useState("");
    const closeEdits = useActions(actions => actions.closeEdits);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (!task) return
        if (task.description) setTaskInputValue(task.description)
        if (task.dateStr) setPickedDateStr(task.dateStr);
        if (task.timeStr) setPickedTimeStr(task.timeStr);
        if (task.folder.id) setPickedProjectId(task.folder.id);
    }, []);

    const handleSubmitTask: FormEventHandler = e => {
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

    const handleEnterClose: KeyboardEventHandler = e => {
        if (e.key !== "Enter") return;
        handleClickClose();
        e.preventDefault();
    }

    const handleEnterInput: KeyboardEventHandler = e => {
        if (e.key !== "Enter") return;
    }

    return (
        <form className="edittask" onSubmit={handleSubmitTask} id="edittask">
            <div className={`edit-fields ${isFocused ? "focused" : ""}`}>
                <input
                    className="taskinput"
                    type="text"
                    placeholder="Task discription"
                    max="255"
                    onChange={e => setTaskInputValue(e.target.value)}
                    value={taskInputValue}
                    autoFocus
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleEnterInput}
                />
                <div className="picker-container">
                    <DTPicker />
                    <ProjectPicker />
                </div>
            </div>
            <div className="button-container">
                <Button
                    tag="button"
                    type="submit"
                    value="Submit"
                    disabled={!taskInputValue}>
                    {btnName}
                </Button>
                <Button
                    design="outlined"
                    onClick={handleClickClose}
                    onKeyDown={handleEnterClose}>
                    Close
                </Button>
            </div>
        </form>
    )
}

export default EditTask;