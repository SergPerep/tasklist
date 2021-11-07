/**
 * OpenAndCloseEditContext manages states that determine 
 * weather EditTask-component renders or not. It allow only one EditTask 
 * to be rendered at time.
 */

import { createContext, useState, useEffect, useContext } from "react";
import { TasklistContext } from "./TasklistContext";
import { v4 as uuidv4 } from 'uuid';

export const OpenAndCloseEditContext = createContext();

const taskInputId = uuidv4(); // id of the input of «Add new task» is needed to find it in openEditArr

export const OpenAndCloseEditProvider = props => {
    const [openEditArr, setOpenEditArr] = useState(); // Will be array of objects when defined
    const { taskList } = useContext(TasklistContext); // taskList is requred to build openEditArr

    // Makes an array that stores open-edit-statuses with correlated ids
    const buildOpenEditArr = () => {
        // 1. Makes array of open-edit-statuses for each task-item
        let data = taskList.map(task => {
            return {
                id: task.id,
                openEdit: false
            }
        });
        // 2. Adds open-edit-status of add-new-task-input to array
        data.unshift({
            id: taskInputId,
            openEdit: false
        })
        setOpenEditArr(data);
    }

    /**
     * Builds openEditArr when page has been loaded and
     * updates it every time taskList has been updated
     */
    useEffect(() => {
        buildOpenEditArr();
    }, [taskList]);

    // Opens edit of correlated id and closes all other edits
    const openOneEditCloseAllOther = id => {
        const data = openEditArr.map(x => {
            if (x.id !== id) {
                return {
                    id: x.id,
                    openEdit: false
                }
            } else if (x.id === id) {
                return {
                    id,
                    openEdit: true
                }
            }
            return x
        });
        setOpenEditArr(data);
    }

    // Closes Edit with correlated id
    const closeOneEdit = id => {
        const data = openEditArr.map(x => {
            if (x.id === id) {
                return {
                    id,
                    openEdit: false
                }
            } else {
                return x
            }
        })
        setOpenEditArr(data);
    }

    const closeAllEdits = () => {
        const data = openEditArr.map(x => { 
            return {
                id: x.id, 
                openEdit: false
            }
        });
        setOpenEditArr(data);
    }

    const contextValue = {
        openEditArr,
        setOpenEditArr,
        openOneEditCloseAllOther,
        closeOneEdit,
        closeAllEdits,
        taskInputId
    }

    return (
        <OpenAndCloseEditContext.Provider value={contextValue}>
            {props.children}
        </OpenAndCloseEditContext.Provider>
    )
}