import { useState } from "react";
import EditTask from "./EditTask";

const AddTaskInput = () => {
    const [openEdit, setOpenEdit] = useState(false);
    return (
        <div className="addtaskinput">
            {!openEdit &&
                <div className="addtask-container" onClick={()=> setOpenEdit(true)}>
                    <div className="addtask-display">
                        +Add task
                    </div>
                </div>
            }
            {openEdit && 
                <EditTask openEdit={openEdit} setOpenEdit={setOpenEdit} btnName="Add Task" />
            }
        </div>
    )
}

export default AddTaskInput;