const methodOverride = require("method-override");
const path = require("path");
const sessions = require("client-sessions");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const winston = require("../config/winston");
const config = require("../config/config");
const httpStatus = require("http-status");
const routes = require("../api/routes/index.route");

const { promisify } = require("util");
const fs = require("fs");

const readFile = promisify(fs.readFile);

const app = express();

app.db = config.db;

app.use(sessions({
    cookieName:     "session",
    secret:         process.env.SESSION_SECRET,
    duration:       24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 60 * 3
}));

// TODO: Reactivate Helmet for security
// app.use(helmet());
app.use(morgan("combined", { stream: winston.stream }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, "../client")));


app.use("/api", routes);

app.use("/", async (req, res) => {

    try {

        const accountHTML = await readFile(path.join(__dirname, "../views/account.html"));


        res.setHeader("Content-Type", "text/html");
        res.status(200);
        res.send(accountHTML);

    } catch(err){

        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();

    }


});

app.use(async (req, res) => {

    try {

        const notFoundHtml = await readFile(path.join(__dirname, "../views/404.html"));

        res.status(httpStatus.NOT_FOUND);
        res.setHeader("Content-Type", "text/html");
        res.send(notFoundHtml);

    } catch(err){

        res.status(httpStatus.NOT_FOUND).send();

    }


});

module.exports = app;