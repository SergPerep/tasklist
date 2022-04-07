import express from "express";
const router = express.Router();
import colorController from "./colorsController";

// Get colors
router.get("/", colorController.color_list);

export default router;