import { useEffect } from "react";
import getTasks from "./fetch/getTasks";
import getFolders from "./fetch/getFolders";
import useSectionsStore from "./store/useSectionsStore";
import useTasksStore from "./store/useTasksStore";
import useColorsStore from "./store/useColorsStore";
import getColors from "./fetch/getColors";

const DevelopComp = () => {
    const tasks = useTasksStore(state => state.tasks);
    const sections = useSectionsStore(state => state.sections);
    const colors = useColorsStore(state => state.colors);

    useEffect(() => {
        getColors();
        getTasks();
        getFolders();
    }, [])

    const handleButtonClick = () => {
        console.log({tasks});
        console.log({ colors });
        console.log({ sections });
        console.log({
            inbox: {
                uncompleted: tasks.getInboxTasks(),
                completed: tasks.getInboxTasks(true)
            },
            today: {
                uncompleted: tasks.getTodayTasks(),
                completed: tasks.getTodayTasks(true),
                overdue: tasks.getOverdueTasks()
            },
            tomorrow: {
                uncompleted: tasks.getTomorrowTasks(),
                completed: tasks.getTomorrowTasks(true)
            }
        });
    }
    return <div className="develop-comp">
        <button onClick={handleButtonClick}>Click</button>
    </div>
}

export default DevelopComp;