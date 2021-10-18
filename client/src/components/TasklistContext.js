import { createContext, useState, useEffect } from "react"

// Will be imported inside child component
export const TasklistContext = createContext();

// Will be imported inside parent component
export const TasklistProvider = props => {
    // States to share
    const [taskList, setTaskList] = useState([]);

    useEffect(()=>{
        getTasks();
      }, []);

    // Converts data so that JS can work with it
    const convertData = (oldArr) => {
        return oldArr.map(obj => {
            obj.date_and_time = new Date(obj.date_and_time);
            obj.time_of_creation = new Date(obj.time_of_creation);
            obj.time_of_last_update = new Date(obj.time_of_last_update);
            return obj
        });
    };

    // Function makes get-request to server
    const getTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/tasks");
            const rawData = await response.json();
            const data = convertData(rawData);
            setTaskList(data);
        } catch (error) {
            console.error(error.message);
        }
    }
    // Creates context
    return (
        <TasklistContext.Provider value={{taskList, getTasks}}>
            {props.children}
        </TasklistContext.Provider>
    )
}