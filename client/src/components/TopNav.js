import useStore from "../store/useStore";
import logoutUser from "../fetch/auth/logoutUser";

const TopNav = () => {
    const toggleIsSideNavOpened = useStore(state => state.toggleIsSideNavOpened);
    const setIsUserAuthenticated = useStore(state => state.setIsUserAuthenticated);
    const handleClickLogout = () => {
        logoutUser().then(result => setIsUserAuthenticated(result));
    }
    return <div className="topnav">
        <button onClick={() => toggleIsSideNavOpened()}>Menu</button>
        <button onClick={handleClickLogout}>Log out</button>
    </div>
}

export default TopNav;