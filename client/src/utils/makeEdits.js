import NEW_TASK_EDIT_ID from "./NEW_TASK_EDIT_ID";
// Makes an array that stores open-edit-statuses with correlated ids
const makeEdits = (tasks, openedEditId) => {
    const newTaskEdit = {
        id: NEW_TASK_EDIT_ID,
        isEditOpen: false
    }
    // 1. Makes array of open-edit-statuses for each task-item
    const taskEdits = tasks.map(task => ({
        id: task.id,
        isEditOpen: false
    }));
    // 2. Adds open-edit-status of add-new-task-input to array
    const edits = [...taskEdits, newTaskEdit]
        .map(edit => {
            edit.isEditOpen = edit.id === openedEditId;
            return edit;
        })
    return edits
}

export default makeEdits;