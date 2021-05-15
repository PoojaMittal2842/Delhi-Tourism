const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    firstname:String,
    lastname:String,
    password:String,
    country:String,
    contact:String,
    image:String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
