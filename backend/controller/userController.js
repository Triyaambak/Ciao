const { StatusCodes } = require('http-status-codes');
const User = require('../models/user');
const { NotFoundError } = require('../errors/errors');

const getUsersForSideBar = async (req, res) => {
    const loggedInUserId = req.user._id;//retrieving the logged in user Id
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");//retrieving all Users except the currently logged in user and to exclude the password
    res.status(StatusCodes.OK).json(filteredUsers);
}

const getSpecificUserForSidebar = async (req, res) => {
    const loggedInUserId = req.user._id;
    const { searchUserName } = req.params;//retrieving the params to be searched
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId }, userName: { $regex: new RegExp(searchUserName, 'i') } }).select("-password");//retrieving all users with username equal to search param in an case-insensitive way and exlcuding the pasword
    if (filteredUsers.length == 0)
        throw new NotFoundError('No Such Username Exists');//throwing a not found error if result is empty
    res.status(StatusCodes.OK).json(filteredUsers);//sending the result only if it is not empty
}

const getUserDetails = async (req, res) => {
    const { _id, fullName, userName, gender, picture } = req.user;
    res.status(StatusCodes.OK).json({
        _id, fullName, userName, gender, picture
    });
}

module.exports = {
    getUsersForSideBar,
    getSpecificUserForSidebar,
    getUserDetails,
};