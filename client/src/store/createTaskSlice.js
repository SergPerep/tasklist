const createTaskSlice = (set, get) => ({
    tasks: [/*
            {
                id: 110,
                description: "New",
                isCompleted: false,
                time_of_creation: "2021-12-17T20:44:25.154Z",
                date: "2021-12-16",
                time: false,
                folder.id: null,
                folder.name: null
            },...
        */],
    isShowCompletedTasks: localStorage.getItem("isShowCompletedTasks") === "true",
    setIsShowCompletedTasks: (isShowCompletedTasks) => set({ isShowCompletedTasks }),
    setTasks: (taskList) => {
        set({ tasks: taskList })
    }
})

export default createTaskSlice;