const jwt =  require('jsonwebtoken');
const { NotFoundError, UnauthenticatedError } = require('../errors/errors');
const User = require('../models/user');

const authorizeJWT = async (req, res, next) => {
    const token = req.cookies.jwt;//retrieving cookie from browser
    if (!token)
        throw new UnauthenticatedError('Unauthorized Access');
    //if there is no JWT token then throw Unauthorized error
    const decoded = jwt.verify(token, process.env.JWT_SECRET);//verifying the JWT token
    if (!decoded)
        throw new UnauthenticatedError('Unauthorized Access');
    //If the verification is not succesfull throw Unauthorized Error
    const user = await User.findById(decoded.userId).select("-password");
    //retrieve the user from User table excluding the password
    if (!user) {
        throw new NotFoundError('User Not Found');
    }
    //If user does not exist then throw NotFound Error
    req.user = user;
    //Setting the user details to the req object
    next();
    //Traversing the next middleware
}

module.exports = authorizeJWT;