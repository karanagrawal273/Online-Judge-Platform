const { register, login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware.js");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/", userVerification);

module.exports = router;
