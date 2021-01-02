const db  = require('../db');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const Flashcard =  require('../models/flashcard');
const Category = require('../models/category');
const User  = require('../models/user');
const Mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectID;

if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}

// include this every time db is used
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const SALT_ROUNDS = 11;
const TOKEN_KEY = process.env.TOKEN_KEY;

// write functions here
const userOfRequest = (req) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const legit= jwt.verify(token, TOKEN_KEY);
    if (legit) {
      return legit;
    }
    return false;
  }
  catch(error) {
    console.log(error);
    return false;
  }
}

//AUTH



module.exports = {
  // export using names of functions in this object
}
