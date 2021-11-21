import { createContext, useState, useEffect } from "react"

// Will be imported inside child component
export const TasklistContext = createContext();

// Will be imported inside parent component
export const TasklistProvider = props => {
    // States to share
    const [taskList, setTaskList] = useState([]);

    // Get tasks from server when page has been loaded
    useEffect(() => {
        getTasks();
    }, []);

    // Converts data so that JS can work with it
    const convertData = (oldArr) => {
        return oldArr.map(obj => {
            obj.date_and_time = obj.date_and_time ? new Date(obj.date_and_time) : undefined;
            obj.time_of_creation = new Date(obj.time_of_creation);
            obj.time_of_last_update = new Date(obj.time_of_last_update);
            obj.folder = {
                id: obj.folder_id,
                name: obj.folder_name,
            }
            delete obj.folder_id;
            delete obj.folder_name;
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

    const contextValue = {
        taskList,
        getTasks
    };

    // Creates context
    return (
        <TasklistContext.Provider value={contextValue}>
            {props.children}
        </TasklistContext.Provider>
    )
}