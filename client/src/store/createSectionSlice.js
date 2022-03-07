import makeSections from "../utils/makeSections";

export const createComputedSectionSlice = (state) => {
    return {
        sections: makeSections(state.tasks, state.projects, state.colors, state.selectedSectionId)
    }
};

const createSectionSlice = (set, get) => ({
    selectedSectionId: "inb",
    setSelectedSectionId: (id) => set({ selectedSectionId: id })
});

export default createSectionSlice;