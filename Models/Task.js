const mongoose = require("mongoose");

// Defines the schema for a task.
const schema = new mongoose.Schema({
  title: {
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
});

// Creates and exports the Task model based on the schema.
module.exports = mongoose.model("Task", schema);