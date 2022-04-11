import { useState, useEffect, useRef } from "react";

// DETECT CLICK OUTSIDE //
// Returns «domNode» and tracks click outside of it
// If detects click outside performs «handler»
export const useClickOutside = (handler = () => { }, condition = true) => {
  const domNode = useRef<HTMLHeadingElement>(null);;


  // Detect click outside
  useEffect(() => {
    // Handles click on document
    const handleClickOutside = (e: MouseEvent) => {
      if (condition && domNode.current && !domNode.current.contains(e.target as Node)) {
        handler();
      }
    }
    // Mount EventListener
    document.addEventListener("mousedown", handleClickOutside);
    // Demolish EventListener before rerender
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [condition]);

  return domNode;
}

// TRACKS HEIGHT OF THE ELEMENT
// add ref-variable to content that doesn't change the height
// use height-variable for useSpring()
export const useHeight = () => {
  const ref = useRef<HTMLHeadingElement>(null);;
  const [height, setHeight] = useState(10);

  useEffect(() => {
    // Create observer
    const spyHeight = new ResizeObserver((entry) => {
      if (ref.current) {
        // console.log(".. set height: " + ref.current.offsetHeight);
        setHeight(ref.current.offsetHeight);
      }
    });
    // Mount the observer
    if (ref.current) {
      spyHeight.observe(ref.current);
      setHeight(ref.current.offsetHeight);
    }
    // Demount the observer
    return () => spyHeight.disconnect();
  }, []);

  return [ref, height];
};
