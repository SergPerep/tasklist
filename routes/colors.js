const router = require("express").Router();
const colorController = require("../controllers/colorController");

// Get colors
router.get("/", colorController.color_list);

module.exports = router;