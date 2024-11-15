const express = require("express");
const router = express.Router();
const task = require("../Models/Task");

// Displays home page and active tasks, sorted by due date.
router.get("/", async (req, res) => {
  try {
    const tasks = await task
      .find({})
      .sort({ due_date: 1 })
      .collation({ locale: "en", strength: 2 });
    res.render("Layout", { title: "Home", body: "Home", tasks, edit: null });
  } catch (error) {
    console.error(`Display Error: ${error}`);
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
    console.error(`Create Error: ${error}`);
    res.status(500).send("Internal Server Error");
  }
});

// Edits an existing task.
router.get("/tasks/edit/:id", async (req, res) => {
  try {
    const edit = await task.findById(req.params.id);
    if (edit) {
      const tasks = await task.find({});
      res.render("Layout", { title: "Home", body: "Home", tasks, edit });
    } else {
      res.status(404).send("Task Not Found");
    }
  } catch (error) {
    console.error(`Edit Error: ${error}`);
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
    console.error(`Update Error: ${error}`);
    res.status(500).send("Internal Server Error");
  }
});

// Deletes an existing task.
router.post("/tasks/delete/:id", async (req, res) => {
  try {
    await task.findByIdAndDelete(req.params.id);
    res.redirect("/#tasks");
  } catch (error) {
    console.error(`Delete Error: ${error}`);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;