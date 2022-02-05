import create from "zustand";
import { devtools } from "zustand/middleware"
import createTaskSlice from "./createTaskSlice";
import createColorSlice from "./createColorSlice";
import createProjectSlice from "./createProjectSlice";
import { computed } from 'zustand-middleware-computed-state';
// import createSectionSlice from "./createSectionSlice";
import createAuthenticationSlice from "./createAuthenticationSlice";
import createSectionSlice, { computedStore } from "./createSectionSlice";

const store = (set, get) => ({
    ...createTaskSlice(set, get),
    ...createColorSlice(set, get),
    ...createProjectSlice(set, get),
    ...createAuthenticationSlice(set, get),
    ...createSectionSlice(set, get)
})

const useStore = create(devtools(computed(store, computedStore)));

export default useStore;