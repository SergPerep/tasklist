import { today } from "../utils/days";
import date from "date-and-time";

const createPickerSlice = (set, get) => ({
    pickedProjectId: "inb",
    setPickedProjectId: (id) => set({ pickedProjectId: id }),
    pickedDateStr: null,
    setPickedDate: someDate => set(() => {
        // console.log("someDate is a " + typeof someDate);
        if (!someDate) return { pickedDateStr: null };
        if (typeof someDate === "string") return { pickedDateStr: someDate }
        if (someDate instanceof Date) return { pickedDateStr: date.format(someDate, "YYYY-MM-DD") }
        return;
    }),
    pickedTimeStr: null,
    setPickedTimeStr: timeStr => set({ pickedTimeStr: timeStr }),
    timeDisplay: null, // Text String for ex. 12:30
    setTimeDisplay: timeStr => set({ timeDisplay: timeStr }),
    anchorDateObj: new Date(today.getFullYear(), today.getMonth()),
    setAnchorDate: someDate => set(() => {
        if (!someDate) return { anchorDateObj: new Date(today.getFullYear(), today.getMonth()) };
        if (typeof someDate === "string") someDate = new Date(someDate);
        if (someDate instanceof Date) return { anchorDateObj: new Date(someDate.getFullYear(), someDate.getMonth()) }
        return;
    })
})

export default createPickerSlice;