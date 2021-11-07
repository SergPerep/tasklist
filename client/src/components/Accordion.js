import Icon from "./Icon";
import { useState } from "react";

const Accordion = props => {
    const { title, count } = props;
    const [openAccordion, setOpenAccordion] = useState(true);
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
            {openAccordion &&
                <div className="accordion-content">
                    {props.children}
                </div>
            }
        </div>
    )
}

export default Accordion;