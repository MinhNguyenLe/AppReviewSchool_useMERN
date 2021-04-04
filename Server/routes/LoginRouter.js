const router = require("express").Router();
const userCtrl = require("../controllers/useController");

router.post("/register", userCtrl.register);

module.exports = router;
