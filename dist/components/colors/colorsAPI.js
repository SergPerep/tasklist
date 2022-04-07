const router = require("express").Router();
const colorController = require("./colorsController");

// Get colors
router.get("/", colorController.color_list);

module.exports = router;