import { useEffect } from "react";
import SideNav from "../SideNav/SideNav";
import SectionContent from "../SectionContent";
import TopNav from "../TopNav";
import getFolders from "../../fetch/getFolders";
import getTasks from "../../fetch/getTasks";
import getColors from "../../fetch/getColors";
import useStore from "../../store/useStore";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AppPage = () => {
    const setTasks = useStore(state => state.setTasks);
    const setProjects = useStore(state => state.setProjects);
    const setColors = useStore(state => state.setColors);

    const isSideNavOpened = useStore(state => state.isSideNavOpened);
    const setIsSideNavOpened = useStore(state => state.setIsSideNavOpened);
    const isScreenSmall = useStore(state => state.isScreenSmall);
    const setIsScreenSmall = useStore(state => state.setIsScreenSmall);
    
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
        const updateDimensions = () => setIsScreenSmall(window.innerWidth);
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
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
        <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    </div>
}

export default AppPage;