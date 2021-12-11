import React, { useContext } from "react";
import TaskItem from "./TaskItem";
import { DatabaseContext } from "./DatabaseContext";
import date from "date-and-time";
import Accordion from "./Accordion";
import { today, tomorrow } from "./TodayTomorrowVars";
import EmptyState from "./EmptyState";
import { ReactComponent as BallIllust } from "../img/Ball.svg";
import { ReactComponent as FlameIllust } from "../img/Flame.svg";
import { ReactComponent as ChestIllust } from "../img/Chest.svg";
import { ReactComponent as HandIllust } from "../img/Hand.svg";
import { OpenAndCloseEditContext } from "./OpenAndCloseEditContext";


const TaskList = props => {
    const { currSection, showCompleted } = props;
    // Grab state out of «value» of context
    const { taskList } = useContext(DatabaseContext);
    const { openAnyEdit } = useContext(OpenAndCloseEditContext);

    // Takes array and makes a list of elements out of it
    const mapList = list => list.map(task => <TaskItem data={task} key={task.id} />);

    /* INBOX */

    const inboxTaskList = taskList
        .filter(task => !task.status_of_completion ? !task.folder.id : false);

    const completedInboxTaskList = taskList
        .filter(task => task.status_of_completion ? !task.folder.id : false);

    /* TODAY */

    const todayTaskList = taskList
        .filter(task => {
            if (!task.status_of_completion) {
                if (task.date_and_time) {
                    return date.isSameDay(task.date_and_time, today);
                } else return false;
            } else return false;
        });

    const completedTodayTaskList = taskList
        .filter(task => {
            if (task.status_of_completion) {
                if (task.date_and_time) {
                    return date.isSameDay(task.time_of_last_update, today);
                } else return false;
            } else return false;
        });

    const overdueTaskList = taskList
        .filter(task => {
            if (!task.status_of_completion) {
                if (task.date_and_time) {
                    return task.date_and_time.getTime() <= today.getTime() && !date.isSameDay(task.date_and_time, today);
                } else return false;
            } else return false;
        });

    /* TOMORROW */

    const tomorrowTaskList = taskList
        .filter(task => {
            if (!task.status_of_completion) {
                if (task.date_and_time) {
                    return date.isSameDay(task.date_and_time, tomorrow);
                } else return false;
            } else return false;
        });

    const completedTomorrowTaskList = taskList
        .filter(task => {
            if (task.status_of_completion) {
                if (task.date_and_time) {
                    return date.isSameDay(task.date_and_time, tomorrow);
                } else return false;
            } else return false;
        });

    /* PROJECTS */

    const makeProjectTaskList = currSection => {
        return taskList
            .filter(task => {
                if (!task.status_of_completion) {
                    return task.folder.id ? task.folder.id === currSection : false;
                } else return false;
            })
    }
    const makeCompletedProjectTaskList = currSection => {
        return taskList
            .filter(task => {
                if (task.status_of_completion) {
                    return task.folder.id ? task.folder.id === currSection : false;
                } else return false;
            })
    }

    return (
        <div className="tasklist">
            {/* INBOX */}
            {typeof currSection === "string" && currSection.toLowerCase() === "inbox" &&
                <>
                    {inboxTaskList.length > 0 && mapList(inboxTaskList)}
                    {showCompleted && completedInboxTaskList.length > 0 &&
                        <Accordion title="Completed" count={completedInboxTaskList.length}>
                            {mapList(completedInboxTaskList)}
                        </Accordion>
                    }
                    {inboxTaskList.length === 0 && (!showCompleted || showCompleted && completedInboxTaskList.length === 0) && !openAnyEdit &&
                        <EmptyState title="Nothing here" desc="Nothing to do, that is">
                            <FlameIllust />
                        </EmptyState>
                    }
                </>
            }
            {/* TODAY */}
            {typeof currSection === "string" && currSection.toLocaleLowerCase() === "today" &&
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
                    {showCompleted && completedTodayTaskList.length > 0 &&
                        <Accordion title="Completed" count={completedTodayTaskList.length}>
                            {mapList(completedTodayTaskList)}
                        </Accordion>
                    }
                    {todayTaskList.length === 0 && (!showCompleted || showCompleted && completedTodayTaskList.length === 0) && !openAnyEdit &&
                        <EmptyState title="Today is done" desc="Time to rest">
                            <ChestIllust />
                        </EmptyState>
                    }
                </>
            }
            {/* TOMORROW */}
            {typeof currSection === "string" && currSection.toLocaleLowerCase() === "tomorrow" &&
                <>
                    {mapList(tomorrowTaskList)}
                    {showCompleted && completedTomorrowTaskList.length > 0 &&
                        <Accordion title="Completed" count={completedTomorrowTaskList.length}>
                            {mapList(completedTomorrowTaskList)}
                        </Accordion>
                    }
                    {tomorrowTaskList.length === 0 && (!showCompleted || showCompleted && completedTomorrowTaskList.length === 0) && !openAnyEdit &&
                        <EmptyState title="Tomorrow is undefined..." desc="Or is it?">
                            <BallIllust />
                        </EmptyState>
                    }
                </>
            }
            {/* PROJECT */}
            {typeof currSection === "number" &&
                <>
                    {mapList(makeProjectTaskList(currSection))}
                    {showCompleted && makeCompletedProjectTaskList(currSection).length > 0 &&
                        <Accordion title="Completed" count={makeCompletedProjectTaskList(currSection).length}>
                            {mapList(makeCompletedProjectTaskList(currSection))}
                        </Accordion>
                    }
                    {mapList(makeProjectTaskList(currSection)).length === 0 && (!showCompleted || showCompleted && makeCompletedProjectTaskList(currSection).length === 0) && !openAnyEdit &&
                        <EmptyState title="A fresh start" desc="Building something new?">
                            <HandIllust />
                        </EmptyState>
                    }
                </>
            }
        </div>
    )
}

export default TaskList;