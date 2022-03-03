import { useEffect } from "react";
import SideNav from "../SideNav/SideNav";
import SectionContent from "../SectionContent";
import TopNav from "../TopNav";
import getFolders from "../../fetch/getFolders";
import getTasks from "../../fetch/getTasks";
import getColors from "../../fetch/getColors";
import useStore from "../../store/useStore";

const MainPage = () => {
    const setTasks = useStore(state => state.setTasks);
    const setProjects = useStore(state => state.setProjects);
    const setColors = useStore(state => state.setColors);

    const isSideNavOpened = useStore(state => state.isSideNavOpened);
    const setIsSideNavOpened = useStore(state => state.setIsSideNavOpened);
    const isScreenSmall = useStore(state => state.isScreenSmall);
    const setIsScreenSmall = useStore(state => state.setIsScreenSmall);
    const updateDimentions = () => setIsScreenSmall(window.innerWidth);
    const setIsTaskListLoaderVisible = useStore(state => state.setIsTaskListLoaderVisible);
    const setIsSideNavLoaderVisible = useStore(state => state.setIsSideNavLoaderVisible);

    useEffect(() => {
        Promise.all([getColors(), getFolders(), getTasks()])
            .then(values => {
                const [rawColors, rawFolders, rawTasks] = values;
                setTasks(rawTasks);
                setColors(rawColors);
                setProjects(rawFolders);
                setIsSideNavLoaderVisible(false);
                setIsTaskListLoaderVisible(false);
            });
    }, [])

    useEffect(() => {
        updateDimentions();
        window.addEventListener("resize", updateDimentions);
        return () => window.removeEventListener("resize", updateDimentions);
    }, [])

    useEffect(() => {
        if (isScreenSmall) {
            setIsSideNavOpened(false);
        } else {
            setIsSideNavOpened(true)
        }
    }, [isScreenSmall])

    const isOverlayVisible = isScreenSmall && isSideNavOpened;

    return <div className="taskboard">
            <div className="taskboard-header">
                <TopNav />
            </div>
            <div className={`taskboard-container ${isSideNavOpened ? "" : "sidenav-is-hidden"} ${isScreenSmall ? "small-screen" : ""}`}>
                {isOverlayVisible && <div className="overlay" onClick={() => setIsSideNavOpened(false)}></div>}
                <div className="taskboard-sidenav">
                    <SideNav />
                </div>
                <main className="taskboard-display">
                    <div className="taskboard-display-container">
                        <SectionContent />
                    </div>
                </main>
            </div>
        </div>
}

export default MainPage;