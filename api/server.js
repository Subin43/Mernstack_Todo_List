const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Todo = require('./models/Todo');

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connection success"))
  .catch((err) => console.error("Database connection error:", err));

// Get all tasks
app.get('/todo', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create new task
app.post('/todo/new', async (req, res) => {
    try {
        const newTodo = await Todo.create(req.body);
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// Delete task
app.delete('/todo/delete/:id', async (req, res) => {
    try {
        const deleteTask = await Todo.findByIdAndDelete(req.params.id);
        if (!deleteTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => console.log(`Server is running on ${port}`));
