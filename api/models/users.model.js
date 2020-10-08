const { db } = require("../../config/config");
const usersStore = db.get("users");

function authenticateUser(email, password){


    return usersStore
        .find({ email, password })
        .value();

}

module.exports = { authenticateUser };