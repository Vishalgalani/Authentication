const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken")

const userSchema = new Schema({
  username : String,
  email : {
    type : String,
    unique : true
  },
  password : String,
  token : String

});

const USER = mongoose.model('user', userSchema);

module.exports = USER
