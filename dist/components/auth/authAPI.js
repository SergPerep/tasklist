const router = require("express").Router();
const authController = require("./authController");
const requireAuth = require("../../middlewares/requireAuth");

router.post("/register", authController.auth_register_post);

router.post("/login", authController.auth_login_post);

router.get("/logout", requireAuth, authController.auth_logout_get);

router.get("/check-auth", authController.auth_checkAuth_get);

module.exports = router;