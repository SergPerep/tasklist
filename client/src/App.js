import React from "react"
import './App.css';
import TaskList from "./components/TaskList";
import { TasklistProvider } from "./components/TasklistContext";
import TaskNavList from "./components/TaskNavList";
import { DateAndTimePickerProvider } from "./components/Pickers/DateAndTimePickerContext";
import Header from "./components/Header";
import { ProjectPickerProvider } from "./components/Pickers/ProjectPickerContext";
import AddTaskInput from "./components/AddTaskInput";
import { ProjectsProvider } from "./components/Pickers/ProjectsContext";
import { OpenAndCloseEditProvider } from "./components/OpenAndCloseEditContext";

function App() {
  return (
    <TasklistProvider>
      <ProjectsProvider >
        <div className="taskboard">
          <TaskNavList />
          <div className="tasksdiplay">
            <DateAndTimePickerProvider>
              <ProjectPickerProvider>
                <Header title="Inbox"></Header>
                <OpenAndCloseEditProvider>
                  <AddTaskInput />
                  <TaskList />
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
