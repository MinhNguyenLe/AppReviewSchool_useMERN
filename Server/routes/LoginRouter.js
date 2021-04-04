const router = require("express").Router();
const userCtrl = require("../controllers/LoginController");

router.post("/register", userCtrl.register);



module.exports = router;

console.log("Login Router");