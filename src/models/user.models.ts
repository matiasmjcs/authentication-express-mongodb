import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Please provider a username'],
        unique: true,
    },
    email: {
        type: String,
        require: [true, 'Please provider a email'],
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'Please provider a username'],
    },
    isVerfied: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.model('users', userSchema)

export default User



