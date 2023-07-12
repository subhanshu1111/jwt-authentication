const { Router } = require("express");
const AuthController = require("../controller/authController")
const router = Router();
const authController = new AuthController();
router.get("/signup",authController.signup_get)
router.post("/signup",authController.signup_post)
router.get("/login",authController.login_get)
router.post("/login",authController.login_post)

module.exports = router;