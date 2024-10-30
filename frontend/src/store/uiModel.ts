import { Action, action, Computed, computed } from "easy-peasy";
import makeEdits from "../utils/makeEdits";
import { StoreModel } from "./model";

type Id = number | string | null;

export type UIModel = {
    openedEditId: Id,
    setOpenedEdit: Action<UIModel, Id>,
    closeEdits: Action<UIModel>,
    isSideNavOpened: boolean,
    setIsSideNavOpened: Action<UIModel, boolean>,
    toggleIsSideNavOpened: Action<UIModel>,
    isScreenSmall: boolean,
    setIsScreenSmall: Action<UIModel, number>,
    isTaskListLoaderVisible: boolean,
    setIsTaskListLoaderVisible: Action<UIModel, boolean>,
    isSideNavLoaderVisible: boolean,
    setIsSideNavLoaderVisible: Action<UIModel, boolean>,
    edits: Computed<StoreModel, Edit[]>
}

export type Edit = {
    id: number | string | null,
    isEditOpen: boolean
}

const uiModel: UIModel = {
    openedEditId: null,
    setOpenedEdit: action((state, id) => {
        state.openedEditId = id
    }),
    closeEdits: action((state) => {
        state.openedEditId = null;
    }),
    isSideNavOpened: true,
    setIsSideNavOpened: action((state, isOpened) => {
        state.isSideNavOpened = isOpened;
    }),
    toggleIsSideNavOpened: action((state) => {
        state.isSideNavOpened = !state.isSideNavOpened
    }),
    isScreenSmall: false,
    setIsScreenSmall: action((state, windowWidth) => {
        state.isScreenSmall = windowWidth < 800
    }),
    isTaskListLoaderVisible: true,
    setIsTaskListLoaderVisible: action((state, booleanVal) => {
        state.isTaskListLoaderVisible = booleanVal;
    }),
    isSideNavLoaderVisible: true,
    setIsSideNavLoaderVisible: action((state, booleanVal) => {
        state.isSideNavLoaderVisible = booleanVal;
    }),
    edits: computed(state => {
        return makeEdits(state.tasks, state.openedEditId)
    })
}

export default uiModel;



