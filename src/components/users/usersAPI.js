"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const requireAuth_1 = __importDefault(require("../../middlewares/requireAuth"));
const usersController_1 = __importDefault(require("./usersController"));
router.post("/", usersController_1.default.user_checkName_post);
router.delete("/", requireAuth_1.default, usersController_1.default.user_delete);
exports.default = router;
