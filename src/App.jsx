import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;

    setTask([...task, newTask]);
    setNewTask("");
  };

  const removeTask = (index) => {
    setTask(task.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4 text-primary">To Do List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-success" onClick={addTask}>
          Add Task
        </button>
      </div>
      <ul className="list-group">
        {task.map((task, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {task}{" "}
            <button
              onClick={() => removeTask(index)}
              className="btn btn-danger btn-sm"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
