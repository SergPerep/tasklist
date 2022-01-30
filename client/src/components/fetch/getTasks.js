import useTasksStore from "../store/useTasksStore";

const setTasks = useTasksStore.getState().setTasks;

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

const getTasks = async () => {
    try {
        const response = await fetch("/tasks");
        const rawData = await response.json();
        const data = convertData(rawData);
        setTasks(data);
    } catch (error) {
        console.error(error.message);
    }
}

export default getTasks;