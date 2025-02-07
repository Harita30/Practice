require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const taskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// POST a new task
app.post("/api/tasks", async (req, res) => {
  const newTask = new Task({ text: req.body.text, completed: false });
  await newTask.save();
  res.json(newTask);
});

// DELETE a task
app.delete("/api/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

// Update Task (Toggle Completion)
app.put("/api/tasks/:id", async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ msg: "Task not found" });
  
      task.completed = req.body.completed;
      await task.save();
      res.json(task);
    } catch (error) {
      res.status(500).send("Server error");
    }
  });
  
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
