import useStore from "../store/useStore";

const setTasks = useStore.getState().setTasks;

// Converts data so that JS can work with it
const convertData = (oldArr) => {
    return oldArr.map(obj => {
        obj.folder = {
            id: obj.folder_id,
            name: obj.folder_name,
        }
        obj.isCompleted = obj.is_completed;
        obj.dateStr = obj.date;
        delete obj.date;
        obj.timeStr = obj.time;
        delete obj.time;
        delete obj.is_completed;
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
        return data;
    } catch (error) {
        console.error(error.message);
    }
}

export default getTasks;