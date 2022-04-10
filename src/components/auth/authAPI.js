"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = __importDefault(require("./authController"));
const requireAuth_1 = __importDefault(require("../../middlewares/requireAuth"));
router.post("/register", authController_1.default.auth_register_post);
router.post("/login", authController_1.default.auth_login_post);
router.get("/logout", requireAuth_1.default, authController_1.default.auth_logout_get);
router.get("/check-auth", authController_1.default.auth_checkAuth_get);
exports.default = router;
