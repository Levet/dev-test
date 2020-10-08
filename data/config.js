const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const dbFile = process.env.NODE_ENV === "production" ? "./data/users.json" : "./data/test-user.json";

const adapter = new FileSync(dbFile);

module.exports = low(adapter);