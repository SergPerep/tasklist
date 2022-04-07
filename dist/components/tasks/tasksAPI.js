"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const tasksController_1 = __importDefault(require("./tasksController"));
// Get all tasks
router.get("/", tasksController_1.default.task_list);
// Update task:
// Check or uncheck
// Edit description, dates and etc.
router.put("/:id", tasksController_1.default.task_update_put);
// Create a task
router.post("/", tasksController_1.default.task_create_post);
// Delete task
router.delete("/:id", tasksController_1.default.task_delete);
exports.default = router;
