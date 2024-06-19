//model/User.js

const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,

    },
    date : {
        type : Date,
        required : true,
        default : Date.now,
    },
});

module.exports = mongoose.model('User',UserSchema);