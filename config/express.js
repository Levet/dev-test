const methodOverride = require("method-override");
const path = require("path");
const sessions = require("client-sessions");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const winston = require("../config/winston");
const httpStatus = require("http-status");
const routes = require("../api/routes/index.route");

const app = express();

app.use(sessions({
    cookieName:     "session",
    secret:         process.env.SESSION_SECRET,
    duration:       24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 60 * 3
}));

app.use(helmet());
app.use(morgan("combined", { stream: winston.stream }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, "../client")));

app.use("/", routes);

app.use((req, res) => {

    //TODO: Add a nice 404 page.

    res.status(httpStatus.NOT_FOUND).send();
});

module.exports = app;