import React from "react";
import TaskItem from "./TaskItem";
import Accordion from "../Accordion";
import useStore from "../../store/useStore";


const TaskList = () => {
    const isShowCompletedTasks = useStore(state => state.isShowCompletedTasks);
    const selectedSection = useStore(state => state.getSelectedSection());
    const selectedSectionId = selectedSection.id;
    const isSelectedSectionAProject = selectedSection.isAProject;

    const getInboxTasks = useStore(state => state.getInboxTasks);
    const getTodayTasks = useStore(state => state.getTodayTasks);
    const getOverdueTasks = useStore(state => state.getOverdueTasks);
    const getTomorrowTasks = useStore(state => state.getTomorrowTasks);
    const getProjectTasks = useStore(state => state.getProjectTasks);

    // Takes array and makes a list of elements out of it
    const buldList = list => list.map(task => <TaskItem data={task} key={task.id} />);

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