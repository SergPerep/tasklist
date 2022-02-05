import makeSections from "../utils/makeSections";

export const computedStore = (state) => {
    return {
        sections: makeSections(state.tasks, state.projects, state.colors, state.selectedSectionId)
    }
};

export default (set, get) => ({
    selectedSectionId: "inb",
    selectSection: (id) => set((state) => {
        console.log("--> selectSelection");
        return { selectedSectionId: id }
    })
});