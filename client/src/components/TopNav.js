import useStore from "../store/useStore";

const TopNav = () => {
    const toggleIsSideNavOpened = useStore(state => state.toggleIsSideNavOpened)
    return <div className="topnav">
        
        <button onClick={()=>{
            toggleIsSideNavOpened();
        }}>Menu</button>
    </div>
}

export default TopNav;