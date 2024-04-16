const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors/errors');
const User = require('../models/user');

const login = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password)
        throw new BadRequestError('Please Fill In All The Fields');
    const user = await User.findOne({ userName });
    if (!user)
        throw new NotFoundError('UserName Does Not Exist');
    const isMatch = await user.comparePasswords(password);
    if (isMatch) {
        const token = user.createJWT();
        res.cookie("jwt", token, {
            sameSite: "strict",
        });
        res.status(StatusCodes.OK).json({
            id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            picture: user.picture,
        });
    }
    else
        throw new BadRequestError('Invalid Credentials');
}

const signup = async (req, res) => {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (!fullName || !userName || !password || !confirmPassword || !gender)
        throw new BadRequestError('Please Fill In All The Fields');
    if (password !== confirmPassword)
        throw new BadRequestError('Passwords Do Not Match');
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
	const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
    const userDetails = {
        fullName,
        userName,
        password,
        gender,
        picture: gender === 'male' ? boyProfilePic : girlProfilePic,
    };
    const findUser = await User.findOne({ userName });
    if (findUser)
        throw new BadRequestError('UserName Already Exists');
    const user = await User.create(userDetails);
    const token = user.createJWT();
    res.cookie("jwt", token, {
		sameSite: "strict", 
	});
    res.status(StatusCodes.CREATED).json({
        id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        picture: user.picture,
    });
}

const logout = async (req, res) => {
    res.clearCookie('jwt'); 
    res.status(StatusCodes.OK).send('Logged out successfully');
}

module.exports = {
    login, 
    signup,
    logout,
}