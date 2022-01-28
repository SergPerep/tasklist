import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export const SnackbarContext = createContext();

export const SnackbarProvider = props => {
    const [snacks, setSnacks] = useState([{
        id: 1,
        message: "This is my new message"
    }]);

    useEffect(() => {
        if (snacks) {
            const timer = setTimeout(() => {
                setSnacks([]);
            }, 4000);
            return () => {
                clearTimeout(timer);
            }
        }
    }, [snacks]);

    const runSnackbar = (message = "") => {
        setSnacks([{
            id: uuidv4(),
            message: message
        }])
    }
    const contextValue = { snacks, runSnackbar };
    return <SnackbarContext.Provider value={contextValue}>
        {props.children}
    </SnackbarContext.Provider>
}