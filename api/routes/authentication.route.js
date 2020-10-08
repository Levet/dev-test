const express = require("express");

const AuthenticationCtrl = require("../controllers/authentication.controller");
const router = express.Router();

router.post("/login", AuthenticationCtrl.login);

module.exports = router;