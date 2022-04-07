const router = require("express").Router();
const taskController = require("./tasksController");

// Get all tasks
router.get("/", taskController.task_list);

// Update task:
// Check or uncheck
// Edit description, dates and etc.
router.put("/:id", taskController.task_update_put);

// Create a task
router.post("/", taskController.task_create_post);

// Delete task
router.delete("/:id", taskController.task_delete);

module.exports = router;