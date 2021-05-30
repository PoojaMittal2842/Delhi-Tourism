const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const CabSchema = new Schema({
    author:String,
    firstname:String,
    lastname:String,
    contact:String,
    email:String,
    people:String,
    type:String,
    startdate:String,
    enddate:String
});


module.exports = mongoose.model('Cab', CabSchema);
