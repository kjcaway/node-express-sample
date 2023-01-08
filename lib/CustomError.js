const logger = require('./logger');

// use case
// 일반적은 유발 next(CustomError({...})) 
// Promise 코드에서는 reject(CustomError({...})) 

// constructor
exports.CustomError = CustomError;

exports.create = createCustomError;

function createCustomError( setting ){
    return new CustomError(setting, createCustomError);
}

function CustomError( setting, implementationContext ){
    setting = (setting || {});

    this.name = "CustomError";
    this.type = (setting.type || "app");
    this.message = (setting.message || "unknown error");
    this.errorCode = (setting.errorCode || "UNKNOWN");
    this.status = (setting.status || 500);
    
    switch(this.status){
        case 400:
            this.message = "bad request"
            break;
        case 401:
            this.message = "unauthorized";
            break;
        default:
            break;
    }

    Error.captureStackTrace(this, (implementationContext || CustomError));

    logger.error(`[lib.CustomError] status: ${this.status} message: ${this.message}`)
}