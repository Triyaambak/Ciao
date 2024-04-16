const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
    let customError = {
        status: err.statusCode|| StatusCodes.INTERNAL_SERVER_ERROR,
        error: err.message || 'Internal Server Error',
    }
    if (err.name === 'ValidationError') {
        customError.status = StatusCodes.BAD_REQUEST;
        customError.error = Object.values(err.errors)[0].message;
    }
    res.status(customError.status).send(customError.error);
};

module.exports = errorHandler;