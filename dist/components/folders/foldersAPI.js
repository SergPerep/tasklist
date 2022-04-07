const router = require("express").Router();
const folderController = require("./foldersController");

// Get all folders
router.get("/", folderController.folder_list);

// Add new folder
router.post("/", folderController.folder_create_post);

// Update folder
router.put("/:id", folderController.folder_update_put);

// Delete folder
router.delete("/:id", folderController.folder_delete);

module.exports = router;