import EditTask from "./EditTask";
import useStore from "../../store/useStore";
import { today, tomorrow } from "../../utils/days";
import NEW_TASK_EDIT_ID from "../../utils/NEW_TASK_EDIT_ID";
import date from "date-and-time";

const AddTaskInput = () => {
    const openedEditId = useStore(state => state.openedEditId);
    const isThisEditOpened = openedEditId === NEW_TASK_EDIT_ID;
    const setOpenedEdit = useStore(state => state.setOpenedEdit);
    
    const setPickedProjectId = useStore(state => state.setPickedProjectId);
    const setPickedDateStr = useStore(state => state.setPickedDateStr);
    const setPickedDateObj = (dateObj) => setPickedDateStr(date.format(dateObj, "YYYY-MM-DD"));
    
    const selectedSectionId = useStore(state => state.selectedSectionId);
    const sections = useStore(state => state.sections);
    const selectedSection = sections.find(section => section.id === selectedSectionId)
    return (
        <div className="addtaskinput">
            {!isThisEditOpened &&
                <div className="addtask-container" onClick={() => {
                    setOpenedEdit(NEW_TASK_EDIT_ID); // open this Edit, close all other
                    if (selectedSectionId === "inb") return setPickedDateStr("");
                    if (selectedSectionId === "td") return setPickedDateObj(today);
                    if (selectedSectionId === "tmr") return setPickedDateObj(tomorrow);
                    if (selectedSection.isAProject) return setPickedProjectId(selectedSectionId)
                }}>
                    <div className="addtask-display">
                        + Add task
                    </div>
                </div>
            }
            {isThisEditOpened &&
                <EditTask btnName="Add Task"/>
            }
        </div>
    )
}

export default AddTaskInput;