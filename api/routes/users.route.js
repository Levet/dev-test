const express = require("express");

const UsersCtrl = require("../controllers/users.controller");
const authorization = require("../middleware/authorization");
const router = express.Router();

router.route("/user")
    .get(authorization, UsersCtrl.load, UsersCtrl.fetch)
    .put(authorization, UsersCtrl.load, UsersCtrl.update);



module.exports = router;