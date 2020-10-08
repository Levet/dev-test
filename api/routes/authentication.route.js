const express = require("express");

const AuthenticationCtrl = require("../controllers/authentication.controller");
const router = express.Router();

router.post("/login", AuthenticationCtrl.login);
router.get("/logout", AuthenticationCtrl.logout);

module.exports = router;