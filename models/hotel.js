const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const HotelSchema = new Schema({
    author:String,
    firstname:String,
    lastname:String,
    contact:String,
    email:String,
    people:String,
    type:String,
    checkin:String,
    checkout:String
});


module.exports = mongoose.model('Hotel', HotelSchema);
