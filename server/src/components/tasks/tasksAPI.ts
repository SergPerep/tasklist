import express from "express";
const router = express.Router();
import taskController from "./tasksController";

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

export default router;