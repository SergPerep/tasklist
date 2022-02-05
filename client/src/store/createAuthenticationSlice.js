export default (set, get) => ({
    isUserAuthenticated: false,
    setIsUserAuthenticated: (authStatus) => {
        if (authStatus === true) return set({ isUserAuthenticated: true })
        set({ isUserAuthenticated: false })
    }
})