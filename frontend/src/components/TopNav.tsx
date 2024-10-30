import logoutUser from "../fetch/auth/logoutUser";
import Button from "./BasicUI/Button";
import { useActions, useStore } from "src/store";
import React from "react";

const TopNav = () => {
    const toggleIsSideNavOpened = useActions(actions => actions.toggleIsSideNavOpened);
    const handleClickSideNavButton = () => {
        toggleIsSideNavOpened();
    }
    const setIsUserAuthenticated = useActions(actions => actions.setIsUserAuthenticated);
    const handleClickLogout = () => {
        logoutUser().then(result => setIsUserAuthenticated(result));
    }
    const isScreenSmall = useStore(state => state.isScreenSmall);
    const isSideNavOpened = useStore(state => state.isSideNavOpened);
    const isMenuSelected = isScreenSmall && isSideNavOpened;

    return <div className="topnav">
        <div className={`sidenav-btn ${isMenuSelected ? "selected" : ""}`}
            onClick={handleClickSideNavButton}
        >
            <div className="sidenav-btn-icon">
            </div>
        </div>
        <Button design={"transparent"} onClick={handleClickLogout} >Log out</Button>
    </div>
}

export default TopNav;