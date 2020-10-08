const httpStatus = require("http-status");

const usersModel = require("../models/users.model");

class Authentication {

    static login(req, res){

        try {

            const { email, password } = req.body;

            const result = usersModel.authenticateUser(email, password);

            console.log(result)

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

    static logout(req, res){

        res.status(httpStatus.OK).json({"status": "success"});

    }

}

module.exports = Authentication;