const express = require("express");
const router = express.Router();

const authenticationRoutes = require("./authentication.route");
const usersRoutes = require("./users.route");

router.use("/", authenticationRoutes);
router.use("/", usersRoutes);

module.exports = router;