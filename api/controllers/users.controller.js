const httpStatus = require("http-status");
const Joi = require("joi");
const _ = require("lodash");

const usersModel = require("../models/users.model");

const userUpdateSchema = Joi.object({
    age: Joi.number().integer().min(18).max(200),
    name: Joi.object({
        first: Joi.string().required(),
        last: Joi.string().required()
    }),
    company: Joi.string(),
    email: Joi.string(),
    phone: Joi.string().length(11), // Country Code, Area Code, Phone Number.
    address: Joi.string()
});

class Users {

    static load(req, res, next){

        const user = usersModel.loadUser(req.session.userId);

        if(!user){

            // This should never happen.
            // This indicates that somewhere between authentication, and this current request, the user no longer exists.
            return res.status(404).send();
        }

        req.user = user;

        next();

    }

    static fetch(req, res){

        const { balance, picture, age, name, company, email, phone, address } = req.user;

        const user = { balance, picture, age, name, company, email, phone, address };

        res.status(httpStatus.OK).json({"status": "success", user })
    }

    static update(req, res){

        const { error } = userUpdateSchema.validate(req.body);

        if(error){
            return res.status(httpStatus.NOT_ACCEPTABLE).json({ "status": "error", error })
        }

        // TODO: Normalize Database, store raw numbers not formatted ones.
        req.body.phone = req.body.phone ? formatPhone(req.body.phone) : null;

        _.merge(req.user, req.body);

        usersModel.updateUser(req.user.guid);

        res.status(httpStatus.ACCEPTED).json({"status": "success", "user": req.user})
        
    }

}

function formatPhone(phone){
    return `+${phone[0]} (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 11)}`
}

module.exports = Users;