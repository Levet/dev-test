const httpStatus = require("http-status");

module.exports = function(req, res, next){
    if(req.session.authenticated && req.session.userId){
        next();
    } else {
        res.status(httpStatus.FORBIDDEN).send();
    }
};