import { useContext } from "react";
import EditTask from "./EditTask";
import { OpenAndCloseEditContext } from "./OpenAndCloseEditContext";

const AddTaskInput = () => {
    const { openEditArr, openOneEditCloseAllOther, taskInputId } = useContext(OpenAndCloseEditContext);
    const openThisEdit = openEditArr && openEditArr.find(x => x.id === taskInputId) ? openEditArr.find(x => x.id === taskInputId).openEdit : false;
    return (
        <div className="addtaskinput">
            {!openThisEdit &&
                <div className="addtask-container" onClick={() => { openOneEditCloseAllOther(taskInputId) }}>
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