const logger = require('./logger');
const CustomError = require('./CustomError').create;

const commonErrorRes = (err, req, res, next) => {
    if(err){
        if(err.name != "CustomError"){
            res.locals.error = CustomError({
                req: req,
                rootCause: err
            });
            logger.error(err.stack);
        } else{
            res.locals.error = err;
        }

        res.status(res.locals.error.status).json(res.locals.error);
    }
}

module.exports.handle = commonErrorRes;