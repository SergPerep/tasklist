const createPickerSlice = (set, get) => ({
    pickedProjectId: "inb",
    setPickedProject: (id) => set({ pickedProjectId: id })
})

export default createPickerSlice;