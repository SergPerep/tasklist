const createPickerSlice = (set, get) => ({
    pickedProjectId: "inb",
    setPickedProjectId: (id) => set({ pickedProjectId: id })
})

export default createPickerSlice;