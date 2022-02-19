import useStore from "../store/useStore";
import logoutUser from "../fetch/auth/logoutUser";
import Button from "./BasicUI/Button";

const TopNav = () => {
    const toggleIsSideNavOpened = useStore(state => state.toggleIsSideNavOpened);
    const setIsUserAuthenticated = useStore(state => state.setIsUserAuthenticated);
    const handleClickLogout = () => {
        logoutUser().then(result => setIsUserAuthenticated(result));
    }
    const isScreenSmall = useStore(state => state.isScreenSmall);
    const isSideNavOpened = useStore(state => state.isSideNavOpened);
    const isMenuSelected = isScreenSmall && isSideNavOpened;

    return <div className="topnav">
        <div className={`sidenav-btn ${isMenuSelected ? "selected" : ""}`}
            onClick={toggleIsSideNavOpened}
        >
            <div className="sidenav-btn-icon">
            </div>
        </div>
        <Button design={"transparent"} onClick={handleClickLogout} >Log out</Button>
    </div>
}

export default TopNav;