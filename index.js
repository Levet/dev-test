const config = require("./config/config.js");
const app = require("./config/express.js");

app.listen(config.port, () => {
    console.info(`The application has started on port ${config.port} (${config.env})`);
});

module.exports = app;