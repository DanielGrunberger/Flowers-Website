const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
}, {timestamps: true});


const User = mongoose.model('User', userSchema);
module.exports = User;