import React from "react"
import './App.css';
import TaskList from "./components/TaskList";
import InputTask from "./components/InputTask";
import { TasklistProvider } from "./components/TasklistContext";

function App() {

  return (
    <TasklistProvider>
      <div className="tasksdiplay">
        <InputTask />
        <TaskList />
      </div>
    </TasklistProvider>
  );
}

export default App;
