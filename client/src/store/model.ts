import authenticationModel, { AuthenticationModel } from "./authenticationModel";
import colorModel, { ColorModel } from "./colorModel";
import pickerModel, { PickerModel } from "./pickerModel";
import projectModel, { ProjectModel } from "./projectModel";
import sectionModel, { SectionModel } from "./sectionModel";
import taskModel, { TaskModel } from "./taskModel";
import uiModel, { UIModel } from "./uiModel";

export interface StoreModel extends
    TaskModel,
    UIModel,
    PickerModel,
    ProjectModel,
    AuthenticationModel,
    ColorModel,
    SectionModel { }



const model: StoreModel = {
    ...taskModel,
    ...uiModel,
    ...pickerModel,
    ...projectModel,
    ...authenticationModel,
    ...colorModel,
    ...sectionModel
}

export default model;