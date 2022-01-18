import React from "react"
import './App.css';
import { DatabaseProvider } from "./components/DatabaseContext";
import TaskNavList from "./components/TaskNavList";
import { DateAndTimePickerProvider } from "./components/Pickers/DateAndTimePickerContext";
import { ProjectPickerProvider } from "./components/Pickers/ProjectPickerContext";
import { OpenAndCloseEditProvider } from "./components/OpenAndCloseEditContext";
import SectionContent from "./components/SectionContent";
import TopNav from "./components/TopNav";
import Snackbar from "./components/Snackbar";
import { SnackbarProvider } from "./components/SnackbarContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import LoginPage from "./components/Pages/LoginPage";
import SignupPage from "./components/Pages/SignupPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      {/* 
    <SnackbarProvider>
      <DatabaseProvider>
          <div className="taskboard">
            <div className="taskboard-header">
              <TopNav />
            </div>
            <div className="taskboard-container">
              <OpenAndCloseEditProvider>
                <div className="taskboard-sidenav">
                  <TaskNavList/>
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
    */}
    </Router>
  );
}

export default App;
