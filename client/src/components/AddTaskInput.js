import { useContext } from "react";
import EditTask from "./EditTask";
import { OpenAndCloseEditContext } from "./OpenAndCloseEditContext";
import { DateAndTimePickerContext } from "./Pickers/DateAndTimePickerContext";
import { ProjectPickerContext } from "./Pickers/ProjectPickerContext";

const AddTaskInput = props => {
    const { openEditArr, openOneEditCloseAllOther, taskInputId } = useContext(OpenAndCloseEditContext);
    const openThisEdit = openEditArr && openEditArr.find(x => x.id === taskInputId) ? openEditArr.find(x => x.id === taskInputId).openEdit : false;
    const { currDate, currProject } = props;
    const { setSelectedProject } = useContext(ProjectPickerContext);
    const { setSelectedDate } = useContext(DateAndTimePickerContext);
    return (
        <div className="addtaskinput">
            {!openThisEdit &&
                <div className="addtask-container" onClick={() => {
                    openOneEditCloseAllOther(taskInputId); // open this Edit, close all other
                    if (currDate) {
                        // When recieve date then
                        // select this date in Edit
                        setSelectedDate(currDate);
                    } else if (currProject) {
                        // When recieve project then
                        // select this project in Edit
                        setSelectedProject(currProject);
                    }

                }}>
                    <div className="addtask-display">
                        +Add task
                    </div>
                </div>
            }
            {openThisEdit &&
                <EditTask btnName="Add Task" taskInputId={taskInputId} />
            }
        </div>
    )
}

export default AddTaskInput;