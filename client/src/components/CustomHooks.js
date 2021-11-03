import { useEffect, useRef } from "react";

// DETECT CLICK OUTSIDE //
// Returns «domNode» and tracks click outside of it
// If detects click outside performes «handler»
export const useClickOutside = (handler = () => { }, condition = true) => {
    const domNode = useRef();


    // Detect click outside
    useEffect(() => {
        // Handles click on document
        const handleClickOutside = e => {
            if (condition && domNode.current && !domNode.current.contains(e.target)) {
                handler();
            }
        }
        // Mount EventListener
        document.addEventListener("mousedown", handleClickOutside);
        // Demontage EventListener before rerender
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [condition]);

    return domNode;
}