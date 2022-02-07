import makeSections from "../utils/makeSections";

export const createComputedSectionSlice = (state) => {
    return {
        sections: makeSections(state.tasks, state.projects, state.colors, state.selectedSectionId)
    }
};

export default (set, get) => ({
    selectedSectionId: "inb",
    setSelectedSectionId: (id) => set({ selectedSectionId: id })
});