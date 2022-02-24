import { today } from "../utils/days";

const createPickerSlice = (set, get) => ({
    pickedProjectId: "inb",
    setPickedProjectId: (id) => set({ pickedProjectId: id }),

    pickedDateStr: "",
    setPickedDateStr: dateStr => set(() => {
        if (!dateStr) return { pickedDateStr: "" };
        if (typeof dateStr === "string") return { pickedDateStr: dateStr }
    }),

    pickedTimeStr: "",
    setPickedTimeStr: timeStr => set(() => {
        if (typeof timeStr !== "string") return { pickedTimeStr: "" };
        return { pickedTimeStr: timeStr };
    }),

    anchorDateObj: new Date(today.getFullYear(), today.getMonth()),
    setAnchorDate: someDate => set(() => {
        if (!someDate) return { anchorDateObj: new Date(today.getFullYear(), today.getMonth()) };
        if (typeof someDate === "string") someDate = new Date(someDate);
        if (someDate instanceof Date) return { anchorDateObj: new Date(someDate.getFullYear(), someDate.getMonth()) }
        return;
    })
})

export default createPickerSlice;