const express = require("express");
const router = express.Router();

const authenticationRoutes = require("./authentication.route");

router.use("/", authenticationRoutes);

module.exports = router;