import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css"; // Ensure styles are applied

const API_URL = "https://todoapp-g3nr.onrender.com/api/tasks"; // Use the deployed backend URL; // Backend API URL

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Add task with animation
  const addTask = () => {
    if (!newTask.trim()) return;
    axios
      .post(API_URL, { text: newTask, completed: false })
      .then((response) => {
        setTasks([...tasks, { ...response.data, isNew: true }]); // Add "isNew" flag
        setNewTask("");

        // Remove "isNew" flag after animation
        setTimeout(() => {
          setTasks((prevTasks) =>
            prevTasks.map((task) => ({ ...task, isNew: false }))
          );
        }, 300); // Animation duration
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  // Toggle task completion
  const toggleCompletion = (id) => {
    const updatedTask = tasks.find((task) => task._id === id);
    if (!updatedTask) return; // Ensure task exists

    axios
      .put(`${API_URL}/${id}`, {
        completed: !updatedTask.completed,
      })
      .then((response) => {
        setTasks(
          tasks.map((task) =>
            task._id === id
              ? { ...task, completed: response.data.completed }
              : task
          )
        );
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  // Delete task with exit animation
  const removeTask = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setTasks(tasks.filter((task) => task._id !== id)))
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-400 p-6">
      <div className="bg-white bg-opacity-90 text-black rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          To Do List
        </h1>
        To Do List
        {/* Input Field */}
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            className="flex-grow border border-gray-300 p-3 rounded-lg text-lg"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition"
          >
            Add Task
          </button>
        </div>
        {/* Task List */}
        <ul className="space-y-2">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.li
                key={task._id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                className={`list-group-item ${
                  task.completed ? "completed" : ""
                } ${task.isNew ? "new-task" : ""}`}
                onClick={() => toggleCompletion(task._id)}
              >
                {task.text}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from triggering toggle
                    removeTask(task._id);
                  }}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  ❌
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

export default App;
