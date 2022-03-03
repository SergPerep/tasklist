const createAuthenticationSlice = (set, get) => ({
    isUserAuthenticated: null,
    setIsUserAuthenticated: (authStatus) => {
        if (authStatus === true) return set({ isUserAuthenticated: true })
        set({ isUserAuthenticated: false })
    }
})

export default createAuthenticationSlice;