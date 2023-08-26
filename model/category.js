const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const catSchema = new Schema({
  name : String,
  image : String
});

const  CATEGORY = mongoose.model('category', catSchema);

module.exports = CATEGORY

