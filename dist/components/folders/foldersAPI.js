"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const foldersController_1 = __importDefault(require("./foldersController"));
// Get all folders
router.get("/", foldersController_1.default.folder_list);
// Add new folder
router.post("/", foldersController_1.default.folder_create_post);
// Update folder
router.put("/:id", foldersController_1.default.folder_update_put);
// Delete folder
router.delete("/:id", foldersController_1.default.folder_delete);
exports.default = router;
