import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    user_type:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
export default User