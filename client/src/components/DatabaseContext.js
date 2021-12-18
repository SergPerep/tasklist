import { createContext, useState, useEffect } from "react"

// Will be imported inside child component
export const DatabaseContext = createContext();

// Will be imported inside parent component
export const DatabaseProvider = props => {
    // States to share
    const [selectedNavItem, setSelectedNavItem] = useState(()=>{
        const lStorage = localStorage.getItem("selectedNavItem");
        // If locaStorage not empty
        if (lStorage) {
            // If localStorage-string contains number then return number
            return +lStorage ? +lStorage : lStorage
        }
        // If localStorage empty return "Inbox"
        return "Inbox"
    });
    const [taskList, setTaskList] = useState([]);
    const [projects, setProjects] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);
    
    // Place state of selected nav-item in localStorage
    useEffect(()=>{
        localStorage.setItem("selectedNavItem", selectedNavItem);
    },[selectedNavItem])

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
            const response = await fetch("/tasks");
            const rawData = await response.json();
            const data = convertData(rawData);
            setTaskList(data);
            
        } catch (error) {
            console.error(error.message);
        }
    }

    // GET FOLDERS //

    const getFolders = async () => {
        try {
            const response = await fetch("/folders");
            const data = await response.json();
            setProjects(data);
            // Return array
            return data; // ex: [{id: 3, name: "Work", color_id: 1}, ...]
        } catch (error) {
            console.error(error.message);
        }
    }

    

    // COLORS //

    const getColors = async () => {
        try {
            const response = await fetch("/colors");
            const rawColors = await response.json(); // colors from DB
            // Add Charcoal to colors from DB
            const refinedColors = [{
                id: null,
                name: "Charcoal",
                label: "#808080",
                font: "#000000",
                fill: "rgba(0, 0, 0, 0.12)"
            }, ...rawColors];
            setColors(refinedColors);
        } catch (error) {
            console.error(error.message);
        }
    }

    // ADD PROJECT //

    const addProject = async (folderName, colorId) => {
        try {
            const body = { folderName, colorId };
            const response = await fetch("/folders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            // Feddback to client
            const message = await response.json();
            console.log(message);
            // Return current folder
            const folders = await getFolders();
            const currFolder = folders.find(folder => folder.name === folderName);
            return currFolder; // expect: {name: "Music", id: 283}
        } catch (error) {
            console.error(error.message)
        }
    }

    // DELETE PROJECT //

    const deleteProject = async (id) => {
        try {
            const delProject = await fetch(`/folders/${id}`, {
                method: "DELETE"
            });
            const message = await delProject.json();
            console.log(message);
            getFolders();
            getTasks();
        } catch (error) {
            console.error(error.message);
        }
    }

    // UPDATE NAME OF THE PROJECT //

    const updateProject = async (id, folderName, colorId) => {
        try {
            const body = { folderName, colorId };
            console.log(JSON.stringify(body));
            const response = await fetch(`/folders/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const message = await response.json();
            console.log(message);
            getFolders();
            getTasks();
        } catch (error) {
            console.error(error.message);
        }
    }



    // Get tasks from server when page has been loaded
    useEffect(() => {
        getTasks();
        getFolders();
        getColors();
    }, []);

    const contextValue = {
        taskList,
        getTasks,
        projects,
        setProjects,
        getFolders,
        addProject,
        deleteProject,
        updateProject,
        colors,
        selectedColor,
        setSelectedColor,
        selectedNavItem, 
        setSelectedNavItem
    };

    // Creates context
    return (
        <DatabaseContext.Provider value={contextValue}>
            {props.children}
        </DatabaseContext.Provider>
    )
}