"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const colorsController_1 = __importDefault(require("./colorsController"));
// Get colors
router.get("/", colorsController_1.default.color_list);
exports.default = router;
