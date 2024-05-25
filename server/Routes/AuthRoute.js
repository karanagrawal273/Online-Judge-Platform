const { register, login ,logout} = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware.js");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post('/logout',logout);
router.post("/", userVerification);

module.exports = router;
