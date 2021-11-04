import React, { useState } from "react"
import './App.css';
import { TasklistProvider } from "./components/TasklistContext";
import TaskNavList from "./components/TaskNavList";
import { DateAndTimePickerProvider } from "./components/Pickers/DateAndTimePickerContext";
import { ProjectPickerProvider } from "./components/Pickers/ProjectPickerContext";
import { ProjectsProvider } from "./components/ProjectsContext";
import { OpenAndCloseEditProvider } from "./components/OpenAndCloseEditContext";
import SectionContent from "./components/SectionContent";

function App() {
  const [selectedSection, setSelectedSection] = useState("Inbox");
  return (
    <TasklistProvider>
      <ProjectsProvider >
        <div className="taskboard">
          <TaskNavList data={{ selectedSection, setSelectedSection }} />
          <div className="tasksdiplay">
            <DateAndTimePickerProvider>
              <ProjectPickerProvider>
                <OpenAndCloseEditProvider>
                  <SectionContent data={{ selectedSection }} />
                </OpenAndCloseEditProvider>
              </ProjectPickerProvider>
            </DateAndTimePickerProvider>
          </div>
        </div>
      </ProjectsProvider>
    </TasklistProvider>
  );
}

export default App;
