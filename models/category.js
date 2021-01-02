const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Category = new Schema({
  name: {type: String, required:true},
  author: {type: Schema.Types.ObjectId, ref:"users", required:true}
},
{timestamps: false});

module.exports = mongoose.model("categories", Category);

