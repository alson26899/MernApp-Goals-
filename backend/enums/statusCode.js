const statusCode = {
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    SUCCESS: 200,
    CREATED: 201,
    INTERNAL_SERVER_ERROR:500
}

Object.freeze(statusCode);

module.exports = statusCode;