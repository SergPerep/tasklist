import { useContext, useEffect } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import { DatabaseProvider } from "../contexts/DatabaseContext";
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

const MainPage = () => {
    const { logoutUser } = useContext(AuthenticationContext);
    const tasks = useStore(state => state.tasks);
    const setTasks = useStore(state => state.setTasks);
    const setProjects = useStore(state => state.setProjects);
    const setColors = useStore(state => state.setColors);

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
        logoutUser();
    }
    return <>
        {/*<h1>Main page</h1>
        <Button design="outlined" onClick={handleClickLogout}>Logout</Button> */}

        <SnackbarProvider>
            <DatabaseProvider>
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
            </DatabaseProvider>
            <Snackbar />
        </SnackbarProvider>

    </>
}

export default MainPage;