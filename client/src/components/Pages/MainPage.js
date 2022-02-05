import { useEffect } from "react";
import SideNav from "../SideNav/SideNav";
import { DateAndTimePickerProvider } from "../Pickers/DateAndTimePickerContext";
import { ProjectPickerProvider } from "../Pickers/ProjectPickerContext";
import { OpenAndCloseEditProvider } from "../contexts/OpenAndCloseEditContext";
import SectionContent from "../SectionContent";
import TopNav from "../TopNav";
import Snackbar from "../Snackbar";
import { SnackbarProvider } from "../contexts/SnackbarContext";
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

        <SnackbarProvider>
            <div className="taskboard">
                <div className="taskboard-header">
                    <TopNav />
                </div>
                <div className="taskboard-container">
                    <OpenAndCloseEditProvider>
                        <div className="taskboard-sidenav">
                            <SideNav />
                        </div>
                        <div className="taskboard-display">
                            <div className="taskboard-display-container">
                                <DateAndTimePickerProvider>
                                    <ProjectPickerProvider>
                                        <SectionContent />
                                    </ProjectPickerProvider>
                                </DateAndTimePickerProvider>
                            </div>
                        </div>
                    </OpenAndCloseEditProvider>
                </div>
            </div>
            <Snackbar />
        </SnackbarProvider>

    </>
}

export default MainPage;