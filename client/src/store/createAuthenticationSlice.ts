import { GetState, SetState } from "zustand";

interface AuthenticationSlice {
    isUserAuthenticated: boolean | null,
    setIsUserAuthenticated: (authStatus: boolean) => void
}

const createAuthenticationSlice = (set: SetState<AuthenticationSlice>, get: GetState<AuthenticationSlice>): AuthenticationSlice => ({
    isUserAuthenticated: null,
    setIsUserAuthenticated: (authStatus: boolean) => {
        if (authStatus === true) return set({ isUserAuthenticated: true })
        set({ isUserAuthenticated: false })
    }
})

export default createAuthenticationSlice;