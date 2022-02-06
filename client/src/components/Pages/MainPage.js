import { useEffect } from "react";
import SideNav from "../SideNav/SideNav";
import { DateAndTimePickerProvider } from "../Pickers/DateAndTimePickerContext";
import SectionContent from "../SectionContent";
import TopNav from "../TopNav";
import getFolders from "../../fetch/getFolders";
import getTasks from "../../fetch/getTasks";
import getColors from "../../fetch/getColors";
import useStore from "../../store/useStore";
import logoutUser from "../../fetch/auth/logoutUser";

const MainPage = () => {
    const setTasks = useStore(state => state.setTasks);
    const setProjects = useStore(state => state.setProjects);
    const setColors = useStore(state => state.setColors);
    const setIsUserAuthenticated = useStore(state => state.setIsUserAuthenticated);

    useEffect(() => {
        Promise.all([getColors(), getFolders(), getTasks()])
            .then(values => {
                const [rawColors, rawFolders, rawTasks] = values;
                setTasks(rawTasks);
                setColors(rawColors);
                setProjects(rawFolders);
            });
    }, [])

    const handleClickLogout = () => {
        logoutUser().then(result => setIsUserAuthenticated(result));
    }
    return <>
        {/*<h1>Main page</h1>
        <Button design="outlined" onClick={handleClickLogout}>Logout</Button> */}

        <div className="taskboard">
            <div className="taskboard-header">
                <TopNav />
            </div>
            <div className="taskboard-container">
                <div className="taskboard-sidenav">
                    <SideNav />
                </div>
                <div className="taskboard-display">
                    <div className="taskboard-display-container">
                        <DateAndTimePickerProvider>
                                <SectionContent />
                        </DateAndTimePickerProvider>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default MainPage;