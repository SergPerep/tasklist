import makeEdits from "../utils/makeEdits";

export const createComputedInterfaceSlice = (state) => ({
    edits: makeEdits(state.tasks, state.openedEditId)
})

const createInterfaceSlice = (set, get) => ({
    openedEditId: null,
    setOpenedEdit: (id) => set({ openedEditId: id }),
    closeEdits: () => set({ openedEditId: null }),
    isSideNavOpened: true,
    setIsSideNavOpened: (isOpened) => set({ isSideNavOpened: isOpened }),
    toggleIsSideNavOpened: () => set(state => ({ isSideNavOpened: !state.isSideNavOpened })),
    isScreenSmall: false,
    setIsScreenSmall: (windowWidth) => set({ isScreenSmall: windowWidth < 800 })
})

export default createInterfaceSlice;



