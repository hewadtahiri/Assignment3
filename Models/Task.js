const mongoose = require("mongoose");

// Defines the schema for a task.
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  due_date: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Creates and exports the Task model based on the schema.
module.exports = mongoose.model("Task", taskSchema);