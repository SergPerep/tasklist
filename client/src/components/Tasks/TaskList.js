import Task from "./Task";
import Accordion from "../Accordion";
import useStore from "../../store/useStore";
import { filterInboxTasks, filterOverdueTasks, filterTodayTasks, filterTomorrowTasks, filterProjectTasks } from "../../utils/filterTasks";
import EmptyState from "../EmptyState";


const TaskList = () => {
    const isShowCompletedTasks = useStore(state => state.isShowCompletedTasks);
    const sections = useStore(state => state.sections);
    const selectedSection = sections.find(section => section.selected);
    const selectedSectionId = useStore(state => state.selectedSectionId);
    const isSelectedSectionAProject = selectedSection?.isAProject;
    const tasks = useStore(state => state.tasks);

    // Takes array and makes a list of elements out of it
    const buldList = list => list.map(task => <Task task={task} key={task.id} />);

    /* INBOX */
    const inboxTaskList = filterInboxTasks(tasks, false);
    const completedInboxTaskList = filterInboxTasks(tasks, true);

    /* TODAY */
    const todayTaskList = filterTodayTasks(tasks, false);
    const completedTodayTaskList = filterTodayTasks(tasks, true);
    const overdueTaskList = filterOverdueTasks(tasks);
    // console.log({ overdueTaskList });


    /* TOMORROW */
    const tomorrowTaskList = filterTomorrowTasks(tasks, false);
    const completedTomorrowTaskList = filterTomorrowTasks(tasks, true);

    /* PROJECTS */
    const projectTaskList = filterProjectTasks(tasks, selectedSectionId, false);
    const completedProjectTaskList = filterProjectTasks(tasks, selectedSectionId, true);

    const isInboxListEmpty = !(inboxTaskList.length > 0 || (isShowCompletedTasks && completedInboxTaskList.length > 0))
    const isTodayListEmpty = !(overdueTaskList.length > 0 || todayTaskList?.length !== 0 || (isShowCompletedTasks && completedTodayTaskList.length > 0));
    const isTomorrowListEmpty = !(tomorrowTaskList.length > 0 || (isShowCompletedTasks && completedTomorrowTaskList.length > 0));
    const isProjectListEmpty = !(projectTaskList?.length > 0 || (isShowCompletedTasks && completedProjectTaskList?.length > 0));
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
                    {isInboxListEmpty && <EmptyState sectionType="Inbox" />}
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
                            {todayTaskList?.length !== 0 &&
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
                    {isTodayListEmpty && <EmptyState sectionType="Today" />}
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
                    {isTomorrowListEmpty && <EmptyState sectionType="Tomorrow" />}
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
                    {isProjectListEmpty && <EmptyState sectionType="Project" />}
                </>
            }
        </div>
    )
}

export default TaskList;