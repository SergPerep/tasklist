const router = require("express").Router();
const requireAuth = require("../../middlewares/requireAuth");
const userController = require("./usersController");

router.post("/", userController.user_checkName_post);

router.delete("/", requireAuth, userController.user_delete);

module.exports = router;