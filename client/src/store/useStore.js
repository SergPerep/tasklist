import create from "zustand";
import { devtools } from "zustand/middleware"
import createTaskSlice from "./createTaskSlice";
import createColorSlice from "./createColorSlice";
import createProjectSlice from "./createProjectSlice";
import { computed } from 'zustand-middleware-computed-state';
import createAuthenticationSlice from "./createAuthenticationSlice";
import createSectionSlice, { createComputedSectionSlice } from "./createSectionSlice";
import createInterfaceSlice, { createComputedInterfaceSlice } from "./createInterfaceSlice";
import createPickerSlice from "./createPickerSlice";

const store = (set, get) => ({
    ...createTaskSlice(set, get),
    ...createColorSlice(set, get),
    ...createProjectSlice(set, get),
    ...createAuthenticationSlice(set, get),
    ...createSectionSlice(set, get),
    ...createInterfaceSlice(set, get),
    ...createPickerSlice(set, get)
})

const computedStore = (state) => ({
    ...createComputedSectionSlice(state),
    ...createComputedInterfaceSlice(state)
})

const useStore = create(devtools(computed(store, computedStore)));

export default useStore;