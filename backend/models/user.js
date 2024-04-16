require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please provide Name'],
        trim: true,
        maxlength: [20, 'Name can not be longer than 20 characters'],
        match: [/^[a-zA-Z\s]*$/, 'Please provide a valid Name'],
    },
    userName: {
        type: String,
        unique: true,
        required: [true, 'Please provide UserName'],
        trim: true,
        maxlength: [20, 'UserName can not be longer than 20 characters'],
        match: [/^[a-zA-Z0-9_.]*$/, 'Please provide a valid Username']
    },
    password: {
        type: String,
        required: [true, 'Please provide Password'],
        trim: true,
        minlength: [8, 'Password cannot be lesser than 8 characters'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must have at least one uppercase letter, one lowercase letter, and one digit'],
    },
    gender: {
        type: String,
        required: [true, "Please provide Gender"],
        enum: ["male", "female"],
    },
    picture: {
        type: String,
        default: "",
    },
},
    { timestamps: true });

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    )
};

UserSchema.methods.comparePasswords = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model('User', UserSchema);