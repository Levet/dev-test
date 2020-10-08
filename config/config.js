const Joi = require("joi");
const path = require("path");

const db = require("../data/config");

require("dotenv").config({ path: path.join(__dirname, "../.env")});

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid("development", "production", "test")
        .default("development"),
    PORT: Joi.number()
        .default(3030),
    SESSION_SECRET: Joi.string().required()
});

const env = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    SESSION_SECRET: process.env.SESSION_SECRET
};

const { error, value: envVars } = envVarsSchema.validate(env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    db
};

module.exports = config;