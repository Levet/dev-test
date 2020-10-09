const httpStatus = require("http-status");

const usersModel = require("../models/users.model");

class Authentication {


    //TODO: Password should be hashed with salt and secret, not stored raw.

    static login(req, res){

        try {

            const { email, password } = req.body;

            const result = usersModel.authenticateUser(email, password);

            if(result && result.isActive){

                req.session = {
                    authenticated: true,
                    userId: result.guid
                };

                return res.status(httpStatus.ACCEPTED).json({"status": "success"});

            } else {

                return res.status(httpStatus.UNAUTHORIZED).send();

            }

        } catch(err){

            console.error(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send()

        }

    }

    static authenticated(req, res){
        const { authenticated } = req.session;

        res.status(httpStatus.OK).json({"status": "success", authenticated });
    }

    static logout(req, res){

        req.session.reset();

        res.status(httpStatus.OK).json({"status": "success"});

    }

}

module.exports = Authentication;