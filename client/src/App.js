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

function App() {
  return (
    <TasklistProvider>
      <div className="taskboard">
        <TaskNavList />
        <div className="tasksdiplay">
          <DateAndTimePickerProvider>
            <Header title="Inbox"></Header>
            <EditTask />
            <TaskList />
          </DateAndTimePickerProvider>
        </div>
      </div>
    </TasklistProvider>
  );
}

export default App;
