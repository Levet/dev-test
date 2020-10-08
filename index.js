const config = require("./config/config.js");
const app = require("./config/express.js");

const server = app.listen(config.port, () => {
    console.info(`The application has started on port ${config.port} (${config.env})`);
});

// 1. Setup webpack, packages, server, config, etc. X
// 2. Create Endpoint Tests
// 3. Create E2E tests (nightwatch)
// 4. Write Endpoints
// - Validation
// - Model - Controller
// - Views /login, /account
// 5. Write Front end
// -
// 6. Hash, Salt, Secret, passwords.