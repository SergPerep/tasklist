import React, { useState, useContext, useEffect, useRef } from "react";
import Calendar from "./Pickers/Calendar";
import Dropdown from "./Dropdown";
import { TasklistContext } from "./TasklistContext";
import { DateAndTimePickerContext } from "./Pickers/DateAndTimePickerContext";
import date from "date-and-time";
import Button from "./Button";


const InputTask = () => {
    // Grab function out of «value» of context
    const { getTasks } = useContext(TasklistContext);
    const [value, setValue] = useState("");
    const [calOpen, setCalOpen] = useState(false);
    const dropdownDate = useRef();
    const contextValue = useContext(DateAndTimePickerContext);
    const { ancorDate, setAncorDate, selectedDate, setSelectedDate, today, chosenDate, setChosenDate } = contextValue;

    // const calDropdownName = selectedDate ? date.format(selectedDate, "DD MMM") : "Date";

    const calDropdownName = (chosenDate) => {
        const tomorrow = date.addDays(today, 1);
        if (chosenDate === undefined) {
            return "Date";
        } else if (date.isSameDay(chosenDate, today)) {
            return "Today";
        } else if (date.isSameDay(chosenDate, tomorrow)) {
            return "Tomorrow";
        } else if (chosenDate) {
            return date.format(chosenDate, "DD MMM");
        }
    }

    useEffect(() => {
        // Mount EventListener
        document.addEventListener("click", handleClickDocument);
        // Demontage EventListener
        return () => {
            document.removeEventListener("click", handleClickDocument);
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = { description: value };
        try {
            const newTask = await fetch("http://localhost:5000/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const message = await newTask.json();
            console.log(message);
            getTasks();
            setValue("");
        } catch (error) {
            console.error(error.message);
        }

    }

    const handleClickDate = () => {
        setCalOpen(true);
    }

    const handleClickDocument = (e) => {
        const isClickInside = dropdownDate.current.contains(e.target);
        if (!isClickInside) {
            setCalOpen(false);
        }
    }

    const handleClickButton = () => {
        setChosenDate(selectedDate);
        setCalOpen(false);
    }

    return (

        <form className="taskinput" onSubmit={handleSubmit}>
            <input type="text" placeholder="+ Add task" value={value} onChange={e => setValue(e.target.value)} />
            <div className="taskinput-options">

                <Dropdown name={calDropdownName(chosenDate)} onClick={handleClickDate} ref={dropdownDate}>
                    {calOpen && <>
                        <Calendar selectedDate={selectedDate} />
                        <div className="button-containter">
                            <Button onClick={handleClickButton}>Ok</Button>
                        </div>
                    </>}
                </Dropdown>
                <Dropdown name="Project"></Dropdown>

            </div>
        </form>

    )
}

export default InputTask;