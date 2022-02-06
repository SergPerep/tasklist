import makeEdits from "../utils/makeEdits";

export const createComputedEditSlice = (state) => ({
    edits: makeEdits(state.tasks, state.openedEditId)
})

const createEditSlice = (set, get) => ({
    openedEditId: null,
    setOpenedEdit: (id) => set({openedEditId: id}),
    closeEdits: () => set({openedEditId: null}),
})

export default createEditSlice;



