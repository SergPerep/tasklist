import { action, Action } from "easy-peasy";

export interface AuthenticationModel {
    isUserAuthenticated: boolean | null,
    setIsUserAuthenticated: Action<AuthenticationModel, boolean>
}

const authenticationModel: AuthenticationModel = {
    isUserAuthenticated: null,
    setIsUserAuthenticated: action((state, authStatus) => {
        if (authStatus === true) {
            state.isUserAuthenticated = true;
        } else {
            state.isUserAuthenticated = false;
        }
    })
};

export default authenticationModel;