import express from "express";
const router = express.Router();
import folderController from "./foldersController";

// Get all folders
router.get("/", folderController.folder_list);

// Add new folder
router.post("/", folderController.folder_create_post);

// Update folder
router.put("/:id", folderController.folder_update_put);

// Delete folder
router.delete("/:id", folderController.folder_delete);

export default router;