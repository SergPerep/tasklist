import { useContext } from "react";
import EditTask from "./EditTask";
import { OpenAndCloseEditContext } from "./contexts/OpenAndCloseEditContext";
import { DateAndTimePickerContext } from "./Pickers/DateAndTimePickerContext";
import { ProjectPickerContext } from "./Pickers/ProjectPickerContext";
import useStore from "../store/useStore";
import { today, tomorrow } from "./TodayTomorrowVars";

const AddTaskInput = props => {
    const { openEditArr, openOneEditCloseAllOther, taskInputId } = useContext(OpenAndCloseEditContext);
    const openThisEdit = openEditArr && openEditArr.find(x => x.id === taskInputId) ? openEditArr.find(x => x.id === taskInputId).openEdit : false;
    const { setSelectedProject } = useContext(ProjectPickerContext);
    const { setSelectedDate } = useContext(DateAndTimePickerContext);
    const selectedSection = useStore(state => state.getSelectedSection());
    const selectedSectionId = selectedSection.id;
    return (
        <div className="addtaskinput">
            {!openThisEdit &&
                <div className="addtask-container" onClick={() => {
                    openOneEditCloseAllOther(taskInputId); // open this Edit, close all other
                    if (selectedSectionId === "td") return setSelectedDate(today)
                    if (selectedSectionId === "tmr") return setSelectedDate(tomorrow)
                    if (selectedSection.isAProject)  return setSelectedProject(selectedSection)
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