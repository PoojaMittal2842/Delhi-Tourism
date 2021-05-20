const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const TicketSchema = new Schema({
    author:String,
    firstname:String,
    lastname:String,
    contact:String,
    email:String,
    adult_no:String,
    children_no:String,
    time_slot:String,
    date:String
});

TicketSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Ticket', TicketSchema);