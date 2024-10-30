import { action, Action } from "easy-peasy";
import { today } from "../utils/days";

export type PickerModel = {
    pickedProjectId: string | number,
    setPickedProjectId: Action<PickerModel, string | number>,
    pickedDateStr: string,
    setPickedDateStr: Action<PickerModel, string | null>,
    pickedTimeStr: string,
    setPickedTimeStr: Action<PickerModel, string>,
    anchorDateObj: Date,
    setAnchorDate: Action<PickerModel, string | Date>,
    isDateMenuOpen: boolean,
    setIsDateMenuOpen: Action<PickerModel, boolean>
}

const pickerModel: PickerModel = {
    pickedProjectId: "inb",
    setPickedProjectId: action((state, id) => {
        state.pickedProjectId = id;
    }),

    pickedDateStr: "",
    setPickedDateStr: action((state, dateStr) => {
        if (!dateStr) {
            state.pickedDateStr = "";
        } else if (typeof dateStr === "string") {
            state.pickedDateStr = dateStr;
        }
    }),

    pickedTimeStr: "",
    setPickedTimeStr: action((state, timeStr) => {
        if (typeof timeStr !== "string") {
            state.pickedTimeStr = ""
        } else {
            state.pickedTimeStr = timeStr;
        }
    }),
    anchorDateObj: new Date(today.getFullYear(), today.getMonth()),
    setAnchorDate: action((state, someDate) => {
        if (!someDate) {
            state.anchorDateObj = new Date(today.getFullYear(), today.getMonth());
        } else {
            if (typeof someDate === "string") someDate = new Date(someDate);
            if (someDate instanceof Date) {
                state.anchorDateObj = new Date(someDate.getFullYear(), someDate.getMonth())
            }
        }
    }),
    isDateMenuOpen: false,
    setIsDateMenuOpen: action((state, booleanVal) => {
        state.isDateMenuOpen = booleanVal
    })
}

export default pickerModel;