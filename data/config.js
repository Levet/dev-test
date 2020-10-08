const low = require("lowdb");
const path = require("path");

const FileSync = require("lowdb/adapters/FileSync");
const dbFile = process.env.NODE_ENV === "production" ? "./users.json" : "./test-users.json";

const adapter = new FileSync(path.join(__dirname, dbFile));

module.exports = low(adapter);