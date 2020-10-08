const httpStatus = require("http-status");

const usersModel = require("../models/users.model");

class Authentication {

    static login(req, res){

        try {

            const { email, password } = req.body;

            const result = usersModel.authenticateUser(email, password);

            if(result){
                return res.status(httpStatus.ACCEPTED).json({"status": "success"});
            } else {
                return res.status(httpStatus.UNAUTHORIZED).send();
            }


        } catch(err){

            console.error(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send()

        }

    }

}

module.exports = Authentication;