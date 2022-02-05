import React from "react";
import TaskItem from "./TaskItem";
import Accordion from "../Accordion";
import useStore from "../../store/useStore";


const TaskList = () => {
    const isShowCompletedTasks = useStore(state => state.isShowCompleted);
    const selectedSection = useStore(state => state.getSelectedSection());
    const selectedSectionId = selectedSection.id;
    const isSelectedSectionAProject = selectedSection.isAProject;

    const getInboxTasks = useStore(state => state.getInboxTasks);
    const getTodayTasks = useStore(state => state.getTodayTasks);
    const getOverdueTasks = useStore(state => state.getOverdueTasks);
    const getTomorrowTasks = useStore(state => state.getTomorrowTasks);
    const getProjectTasks = useStore(state => state.getProjectTasks);

    // Takes array and makes a list of elements out of it
    const mapList = list => list.map(task => <TaskItem data={task} key={task.id} />);

    /* INBOX */
    const inboxTaskList = getInboxTasks(false);
    const completedInboxTaskList = getInboxTasks(true);

    /* TODAY */
    const todayTaskList = getTodayTasks(false);
    const completedTodayTaskList = getTodayTasks(true);
    const overdueTaskList = getOverdueTasks();

    /* TOMORROW */
    const tomorrowTaskList = getTomorrowTasks(false);
    const completedTomorrowTaskList = getTomorrowTasks(true)

    /* PROJECTS */
    const projectTaskList = getProjectTasks(selectedSectionId, false);
    const completedProjectTaskList = getProjectTasks(selectedSectionId, true);

    return (
        <div className="tasklist">

            {/* INBOX */}
            {selectedSectionId === "inb" &&
                <>
                    {inboxTaskList.length > 0 && mapList(inboxTaskList)}
                    {isShowCompletedTasks && completedInboxTaskList.length > 0 &&
                        <Accordion title="Completed" count={completedInboxTaskList.length}>
                            {mapList(completedInboxTaskList)}
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
                                {mapList(overdueTaskList)}
                            </Accordion>
                            {todayTaskList && todayTaskList.length !== 0 &&
                                <Accordion title="Today" count={todayTaskList.length}>
                                    {mapList(todayTaskList)}
                                </Accordion>
                            }
                        </>
                    }
                    {overdueTaskList.length === 0 &&
                        mapList(todayTaskList)
                    }
                    {isShowCompletedTasks && completedTodayTaskList.length > 0 &&
                        <Accordion title="Completed" count={completedTodayTaskList.length}>
                            {mapList(completedTodayTaskList)}
                        </Accordion>
                    }

                </>
            }
            {/* TOMORROW */}
            {selectedSectionId === "tmr" &&
                <>
                    {mapList(tomorrowTaskList)}
                    {isShowCompletedTasks && completedTomorrowTaskList.length > 0 &&
                        <Accordion title="Completed" count={completedTomorrowTaskList.length}>
                            {mapList(completedTomorrowTaskList)}
                        </Accordion>
                    }
                </>
            }
            {/* PROJECT */}
            {isSelectedSectionAProject &&
                <>
                    {projectTaskList?.length > 0 && mapList(projectTaskList)}
                    {isShowCompletedTasks && completedProjectTaskList?.length > 0 &&
                        <Accordion title="Completed" count={completedProjectTaskList?.length}>
                            {mapList(completedProjectTaskList)}
                        </Accordion>
                    }
                </>
            }
        </div>
    )
}

export default TaskList;