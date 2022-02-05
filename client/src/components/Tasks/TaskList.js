import TaskItem from "./TaskItem";
import Accordion from "../Accordion";
import useStore from "../../store/useStore";
import { filterInboxTasks, filterOverdueTasks, filterTodayTasks, filterTomorrowTasks, filterProjectTasks } from "../../utils/filterTasks";


const TaskList = () => {
    const isShowCompletedTasks = useStore(state => state.isShowCompletedTasks);
    const sections = useStore(state => state.sections);
    const selectedSection = sections.find(section => section.selected);
    const selectedSectionId = useStore(state => state.selectedSectionId);
    const isSelectedSectionAProject = selectedSection.isAProject;
    const tasks = useStore(state => state.tasks);

    // Takes array and makes a list of elements out of it
    const buldList = list => list.map(task => <TaskItem data={task} key={task.id} />);

    /* INBOX */
    const inboxTaskList = filterInboxTasks(tasks, false);
    const completedInboxTaskList = filterInboxTasks(tasks, true);

    /* TODAY */
    const todayTaskList = filterTodayTasks(tasks, false);
    const completedTodayTaskList = filterTodayTasks(tasks, true);
    const overdueTaskList = filterOverdueTasks(tasks);
    

    /* TOMORROW */
    const tomorrowTaskList = filterTomorrowTasks(tasks, false);
    const completedTomorrowTaskList = filterTomorrowTasks(tasks, true);

    /* PROJECTS */
    const projectTaskList = filterProjectTasks(tasks, selectedSectionId, false);
    const completedProjectTaskList = filterProjectTasks(tasks, selectedSectionId, true);

    return (
        <div className="tasklist">

            {/* INBOX */}
            {selectedSectionId === "inb" &&
                <>
                    {inboxTaskList.length > 0 && buldList(inboxTaskList)}
                    {isShowCompletedTasks && completedInboxTaskList.length > 0 &&
                        <Accordion title="Completed" count={completedInboxTaskList.length}>
                            {buldList(completedInboxTaskList)}
                        </Accordion>
                    }
                </>
            }
            {/* TODAY */}
            {selectedSectionId === "td" &&
                <>
                    {overdueTaskList.length > 0 &&
                        <>
                            <Accordion title="Overdue" count={overdueTaskList.length}>
                                {buldList(overdueTaskList)}
                            </Accordion>
                            {todayTaskList && todayTaskList.length !== 0 &&
                                <Accordion title="Today" count={todayTaskList.length}>
                                    {buldList(todayTaskList)}
                                </Accordion>
                            }
                        </>
                    }
                    {overdueTaskList.length === 0 &&
                        buldList(todayTaskList)
                    }
                    {isShowCompletedTasks && completedTodayTaskList.length > 0 &&
                        <Accordion title="Completed" count={completedTodayTaskList.length}>
                            {buldList(completedTodayTaskList)}
                        </Accordion>
                    }

                </>
            }
            {/* TOMORROW */}
            {selectedSectionId === "tmr" &&
                <>
                    {buldList(tomorrowTaskList)}
                    {isShowCompletedTasks && completedTomorrowTaskList.length > 0 &&
                        <Accordion title="Completed" count={completedTomorrowTaskList.length}>
                            {buldList(completedTomorrowTaskList)}
                        </Accordion>
                    }
                </>
            }
            {/* PROJECT */}
            {isSelectedSectionAProject &&
                <>
                    {projectTaskList?.length > 0 && buldList(projectTaskList)}
                    {isShowCompletedTasks && completedProjectTaskList?.length > 0 &&
                        <Accordion title="Completed" count={completedProjectTaskList?.length}>
                            {buldList(completedProjectTaskList)}
                        </Accordion>
                    }
                </>
            }
        </div>
    )
}

export default TaskList;