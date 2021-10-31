import React from "react"
import './App.css';
import TaskList from "./components/TaskList";
import InputTask from "./components/InputTask";
import { TasklistProvider } from "./components/TasklistContext";
import TaskNavList from "./components/TaskNavList";
import Calendar from "./components/Pickers/Calendar";
import { DateAndTimePickerProvider } from "./components/Pickers/DateAndTimePickerContext";
import EditTask from "./components/EditTask";
import Header from "./components/Header";
import { ProjectPickerProvider } from "./components/Pickers/ProjectPickerContext";
import AddTaskInput from "./components/AddTaskInput";
import { ProjectsProvider } from "./components/Pickers/ProjectsContext";

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
                <AddTaskInput />
                <TaskList />
              </ProjectPickerProvider>
            </DateAndTimePickerProvider>
          </div>
        </div>
      </ProjectsProvider>
    </TasklistProvider>
  );
}

export default App;
