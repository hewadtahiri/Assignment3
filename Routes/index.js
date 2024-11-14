const express = require("express");
const router = express.Router();
const task = require("../Models/Task");

// Displays home page and active tasks.
router.get("/", async (req, res) => {
  try {
    const tasks = await task.find({});
    res.render("Layout", { title: "Home", body: "Home", tasks, edit_task: null });
  } catch (error) {
    console.error(`Error fetching tasks: ${error}.`);
    res.status(500).send("Internal Server Error");
  }
});

// Creates a new task.
router.post("/tasks", async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const new_task = new task({ title, description, due_date });
    await new_task.save();
    res.redirect("/#tasks");
  } catch (error) {
    console.error(`Error creating task: ${error}.`);
    res.status(500).send("Internal Server Error");
  }
});

// Edits an existing task.
router.get("/tasks/edit/:id", async (req, res) => {
  try {
    const edit_task = await task.findById(req.params.id);
    if (edit_task) {
      const tasks = await task.find({});
      res.render("Layout", { title: "Home", body: "Home", tasks, edit_task });
    } else {
      res.status(404).send("Task Not Found");
    }
  } catch (error) {
    console.error(`Error fetching task for edit: ${error}.`);
    res.status(500).send("Internal Server Error");
  }
});

// Updates an existing task.
router.post("/tasks/edit/:id", async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    await task.findByIdAndUpdate(req.params.id, { title, description, due_date });
    res.redirect("/#tasks");
  } catch (error) {
    console.error(`Error updating task: ${error}.`);
    res.status(500).send("Internal Server Error");
  }
});

// Deletes an existing task.
router.post("/tasks/delete/:id", async (req, res) => {
  try {
    await task.findByIdAndDelete(req.params.id);
    res.redirect("/#tasks");
  } catch (error) {
    console.error(`Error deleting task: ${error}.`);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;