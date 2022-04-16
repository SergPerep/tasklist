import { createStore, createTypedHooks } from "easy-peasy";
import model, { StoreModel } from "./model";
// import { composeWithDevTools } from "remote-redux-devtools";


// const options = {
//     realtime: true, 
//     trace: true
// };

// const storeConfig: EasyPeasyConfig<StoreModel> = {
//     devTools: true,
//     compose: composeWithDevTools(options)
// }

const store = createStore(model);
export default store;

const typedHooks = createTypedHooks<StoreModel>();

export const useStore = typedHooks.useStoreState;
export const useActions = typedHooks.useStoreActions;