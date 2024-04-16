const { StatusCodes } = require("http-status-codes");
const customError = require("./customError");

class NotFoundError extends customError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError;