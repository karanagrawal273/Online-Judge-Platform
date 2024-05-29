const { runCode } = require("../Controllers/CompilerController");
const router = require("express").Router();

router.post("/", runCode);

module.exports = router;
