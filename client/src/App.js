import React, {Fragment} from "react"
import './App.css';
import TaskList from "./components/TaskList";
import InputTask from "./components/InputTask";

function App() {
  return (
    <Fragment>
      <div className="tasksdiplay">
        <InputTask />
        <TaskList></TaskList>
      </div>
    </Fragment>
  );
}

export default App;
