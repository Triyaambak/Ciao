const { StatusCodes } = require('http-status-codes');

const notFound = (req, res) => {
    res.status(StatusCodes.NOT_FOUND).send('Page Does Not Exist');
}

module.exports = notFound;