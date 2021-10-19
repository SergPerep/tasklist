import React from "react"
import './App.css';
import TaskList from "./components/TaskList";
import InputTask from "./components/InputTask";
import { TasklistProvider } from "./components/TasklistContext";
import TaskNavList from "./components/TaskNavList";
import Calendar from "./components/Calendar/Calendar";
import { CalendarProvider } from "./components/Calendar/CalendarContext";

function App() {
  return (
    <TasklistProvider>
      <div className="taskboard">
        <TaskNavList />
        <div className="tasksdiplay">
          <CalendarProvider>
            <InputTask />
            <TaskList />
          </CalendarProvider>
        </div>
      </div>
    </TasklistProvider>
  );
}

export default App;
