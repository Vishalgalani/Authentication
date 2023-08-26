const mongoose = require('mongoose');
const { token } = require('morgan');
const Schema = mongoose.Schema;


const questionSchema = new Schema({
  question : String,
  options : [String],
  answer : String,
  category : {type: Schema.Types.ObjectId, ref: 'category'},
});

const  QUESTION = mongoose.model('question', questionSchema);

module.exports = QUESTION

