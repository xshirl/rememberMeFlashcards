const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Flashcard = new Schema({
  question: {type: String, require: true},
  answer: {type: String, required: true},
  difficulty: {type: Number, required: true},
  category: {type: Schema.Types.ObjectId, ref:"categories", required:true},
  author: {type: Schema.Types.ObjectId, ref:"users", required:true}
},
{timestamps:false}
)

module.exports = mongoose.model('flashcards', Flashcard)
