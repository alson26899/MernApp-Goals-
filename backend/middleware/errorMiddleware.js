const statusCode = require("../enums/statusCode");

const errorHandler = (err, req, res, next) => {
    const responseStatusCode = res.statusCode ? res.statusCode : statusCode.INTERNAL_SERVER_ERROR;
    res.status(responseStatusCode);
    res.json({
        message: err.message,
        stack : process.env.NODE_ENV === 'Production' ? null : err.stack
    })
}

module.exports = { errorHandler }