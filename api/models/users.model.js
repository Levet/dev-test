const { db } = require("../../config/config");
const usersStore = db.get("users");

function authenticateUser(email, password){


    return usersStore
        .find({ email, password })
        .value();

}

function loadUser(guid){

    return usersStore
        .find({ guid })
        .value();

}

function updateUser(guid, updates){

    return usersStore
        .find({ guid })
        .assign(updates)
        .write()

}

module.exports = { authenticateUser, loadUser, updateUser };