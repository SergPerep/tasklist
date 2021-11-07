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
  const [selectedNavItem, setSelectedNavItem] = useState("Inbox");
  return (
    <TasklistProvider>
      <ProjectsProvider >
        <div className="taskboard">
          <OpenAndCloseEditProvider>
            <TaskNavList data={{ selectedNavItem, setSelectedNavItem }} />
            <div className="tasksdiplay">
              <DateAndTimePickerProvider>
                <ProjectPickerProvider>
                  <SectionContent data={{ selectedNavItem }} />
                </ProjectPickerProvider>
              </DateAndTimePickerProvider>
            </div>
          </OpenAndCloseEditProvider>
        </div>
      </ProjectsProvider>
    </TasklistProvider>
  );
}

export default App;
