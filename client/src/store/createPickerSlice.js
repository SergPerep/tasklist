import { today } from "../utils/days";
import formatTimeStringForDisplay from "../utils/formatTimeStringForDisplay";

const createPickerSlice = (set, get) => ({
    pickedDateStr: "",
    setPickedDateStr: (dateStr) => set({ pickedDateStr: dateStr }),

    pickedProjectId: "inb",
    setPickedProjectId: (id) => set({ pickedProjectId: id }),

    pickedDateStr: "",
    setPickedDateStr: someDate => set(() => {
        if (!someDate) return { pickedDateStr: "" };
        if (typeof someDate === "string") return { pickedDateStr: someDate }
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