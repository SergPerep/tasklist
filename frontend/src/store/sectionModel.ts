import { action, Action, Computed, computed } from "easy-peasy";
import makeSections from "../utils/makeSections";
import { StoreModel } from "./model";
import { Section } from "src/types";

export type SectionModel = {
    sections: Computed<StoreModel, Section[]>,
    selectedSectionId: string | number,
    setSelectedSectionId: Action<SectionModel, string | number>
}

const sectionModel: SectionModel = {
    sections: computed(state => makeSections(state.tasks, state.projects, state.colors, state.selectedSectionId)),
    selectedSectionId: "inb",
    setSelectedSectionId: action((state, id) => {
        state.selectedSectionId = id;
    })
};

export default sectionModel;