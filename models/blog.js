const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const BlogSchema = new Schema({
    author:String,
    firstname:String,
    lastname:String,
    subject:String,
    blog:String,
    date:String,
    pic:String
});


module.exports = mongoose.model('Blog', BlogSchema);
