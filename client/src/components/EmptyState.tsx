import React from "react";
import { ReactComponent as BicycleRider } from "../img/BicycleRider.svg";
import { ReactComponent as CouchPerson } from "../img/CouchPerson.svg";
import { ReactComponent as InflatableHorse } from "../img/InflatableHorse.svg";
import { ReactComponent as WildYoga } from "../img/WildYoga.svg"

type EmptyStateArgs = {
    sectionType: "Inbox" | "Today" | "Tomorrow" | "Project"
}

const EmptyState = ({ sectionType }: EmptyStateArgs) => {

    return <div className="empty-state">
        <div className="illust-wrapper">
            {sectionType === "Inbox" && <BicycleRider />}
            {sectionType === "Today" && <WildYoga />}
            {sectionType === "Tomorrow" && <InflatableHorse />}
            {sectionType === "Project" && <CouchPerson />}
        </div>
        <div className="empty-state-title">

            {sectionType === "Inbox" && "All done"}
            {sectionType === "Today" && "Nothing for today"}
            {sectionType === "Tomorrow" && "Tomorrow is going to be relaxing"}
            {sectionType === "Project" && "What is the plan?"}

        </div>
        <div className="empty-state-desc">

            {sectionType === "Inbox" && "You are on fire."}
            {sectionType === "Today" && "Run wild, scream, live your life."}
            {sectionType === "Tomorrow" && "Unless you have something in mind."}
            {sectionType === "Project" && ""}

        </div>
    </div>
}

export default EmptyState;