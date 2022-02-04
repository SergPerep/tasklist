import { useContext } from "react";
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

const MainPage = () => {
    const { logoutUser } = useContext(AuthenticationContext);
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