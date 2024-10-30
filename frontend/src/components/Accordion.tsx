import Icon from "./BasicUI/Icon";
import { useState } from "react";
import { useSpring, animated, SpringComponentProps } from "react-spring";
import { useHeight } from "./CustomHooks";
import React from "react";

type AccordionArgs = {
    title: string,
    count: number,
    children: any
}

const Accordion = ({ title, count, children }: AccordionArgs) => {
    const [openAccordion, setOpenAccordion] = useState(true);
    const [overflowHidden, setOverflowHidden] = useState(true)
    const [ref, height] = useHeight();
    const animRoll = useSpring<SpringComponentProps>({
        from: {
            height: height,
            opacity: 1,
            overflowY: "visible"
        },
        to: {
            height: openAccordion ? height : 0,
            opacity: openAccordion ? 1 : 0,
            overflowY: overflowHidden ? "hidden" : "visible"
        },
        onStart: () => setOverflowHidden(true),
        onRest: () => setOverflowHidden(false)
    });
    return (
        <div className="accordion">
            <div className="accordion-header" onClick={() => { setOpenAccordion(!openAccordion) }}>
                <div className="accordion-icon-container">
                    <Icon name={openAccordion ? "AngleDown" : "AngleRight"} size="sm" />
                </div>
                <div>
                    <span className="accordion-title">{title}</span>
                    <span className="accordion-count">{count}</span>
                </div>
            </div>
            <animated.div style={animRoll} className="accordion-container">
                <div className="accordion-content" ref={ref}>
                    {children}
                </div>
            </animated.div>
        </div>
    )
}

export default Accordion;