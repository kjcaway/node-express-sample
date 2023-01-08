const CustomError = require('../lib/CustomError').create;
const logger = require('../lib/logger');

const getHello = (req, res, next) => {
    return res.json({"message": "Hello world!"});
}

const postHello = (req, res, next) => {
    logger.info(JSON.stringify(req.body));

    return res.json({"message": "success"});
}

const customError = (req, res, next) => {
    logger.info("custom error check");
    next(CustomError({ errorCode: "CUSTOM_ERROR_TEST", status: 400 }));
}

const customErrorPromise = (req, res, next) => {
    logger.info("custom error check in promise");

    const p = new Promise((resolve, reject) => {
        const rand = Math.floor(Math.random() * 10); // 0~9 난수
        if(rand >= 5){
            resolve(rand);
        } else{
            reject(CustomError({ errorCode: "CUSTOM_ERROR_PROMISE_TEST", status: 401 }))
        }
    });

    p.then(rand => {
        return res.json({"result": rand});
    }).catch(err => {
        next(err);
    })
}

const jsError = (req, res, next) => {
    logger.info("javascript error check");

    const rand = Math.floor(Math.random() * 10); // 0~9 난수
    if(rand >= 5){
        return res.json({"result": rand});
    } else{
        const illegal = rand.und.value; // TypeError 유발
        return res.json({"result": illegal});
    }
}

module.exports = {
    getHello,
    postHello,
    customError,
    customErrorPromise,
    jsError
}