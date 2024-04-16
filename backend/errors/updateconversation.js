const { StatusCodes } = require("http-status-codes");
const CustomError = require("./customError");

class UpdateConversationError extends CustomError {
    constructor(message) {
        super(message);
        this.status(StatusCodes.NOT_MODIFIED);
    }
}

module.exports = UpdateConversationError;