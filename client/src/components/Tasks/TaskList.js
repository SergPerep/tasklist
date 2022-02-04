import React from "react";
import TaskItem from "./TaskItem";
import Accordion from "../Accordion";
import useTasksStore from "../../stores/useTasksStore";
import useSectionsStore from "../../stores/useSectionsStore";


const TaskList = () => {
    const sections = useSectionsStore(state => state.sections);
    const tasks = useTasksStore(state => state.tasks);
    const isShowCompletedTasks = useTasksStore(state => state.isShowCompleted);
    const selectedSection = sections?.getSelectedSection();
    const selectedSectionId = selectedSection.id;
    const isSelectedSectionAProject = selectedSection.isAProject;

    // Takes array and makes a list of elements out of it
    const mapList = list => list.map(task => <TaskItem data={task} key={task.id} />);

    /* INBOX */
    const inboxTaskList = tasks.getInboxTasks(false);
    const completedInboxTaskList = tasks.getInboxTasks(true);

    /* TODAY */
    const todayTaskList = tasks.getTodayTasks(false);
    const completedTodayTaskList = tasks.getTodayTasks(true);
    const overdueTaskList = tasks.getOverdueTasks();

    /* TOMORROW */
    const tomorrowTaskList = tasks.getTomorrowTasks(false);
    const completedTomorrowTaskList = tasks.getTomorrowTasks(true)

    /* PROJECTS */
    const projectTaskList = tasks.getProjectTasks(selectedSectionId, false);
    const completedProjectTaskList = tasks.getProjectTasks(selectedSectionId, true);

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