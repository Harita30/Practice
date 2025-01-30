import React, { useState } from "react";

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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>To Do List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {task.map((task, index) => (
          <li key={index} style={{ margin: "10px 0" }}>
            {task}{" "}
            <button
              onClick={() => removeTask(index)}
              style={{ marginLeft: "10px" }}
            >
              Remove Task
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
