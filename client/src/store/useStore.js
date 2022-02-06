import create from "zustand";
import { devtools } from "zustand/middleware"
import createTaskSlice from "./createTaskSlice";
import createColorSlice from "./createColorSlice";
import createProjectSlice from "./createProjectSlice";
import { computed } from 'zustand-middleware-computed-state';
// import createSectionSlice from "./createSectionSlice";
import createAuthenticationSlice from "./createAuthenticationSlice";
import createSectionSlice, { createComputedSectionSlice } from "./createSectionSlice";
import createEditSlice, { createComputedEditSlice } from "./createEditSlice";

const store = (set, get) => ({
    ...createTaskSlice(set, get),
    ...createColorSlice(set, get),
    ...createProjectSlice(set, get),
    ...createAuthenticationSlice(set, get),
    ...createSectionSlice(set, get),
    ...createEditSlice(set, get)
})

const computedStore = (state) => ({
    ...createComputedSectionSlice(state),
    ...createComputedEditSlice(state)
})

const useStore = create(devtools(computed(store, computedStore)));

export default useStore;