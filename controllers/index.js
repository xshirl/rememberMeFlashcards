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
const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const { username, name, password, admin_key } = req.body;
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await new User({
      username,
      name,
      password_digest,
    });
    await user.save();

    const payload = {
      id: user._id,
      username: user.username,
      name: user.name,
    };

    const token = jwt.sign(payload, TOKEN_KEY);
    return res.status(201).json({ user: payload, token });
  } catch (error) {
    console.log("Error in signUp");
    return res.status(400).json({ error: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user._id,
        username: user.username,
        name: user.name,
      };
      const token = jwt.sign(payload, TOKEN_KEY);
      return res.status(201).json({ user: payload, token });
    } else {
      res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//verify user
const verifyUser = async (req, res) => {
  try {
    // can only verify with JWT
    const legit = await userOfRequest(req);

    if (legit) {
      const user = await User.findById(legit.id);

      const profile = {
        id: user._id,
        username: user.username,
        name: user.name,
      };

      return res.status(200).json({ user: profile });
    }
    return res.status(401).send("Not Authorized");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCategories = async (req, res) =>  {
  try {
    const categories = await Category.find()
    return res.status(200).json(categories);
  } catch(error) {
    return res.status(500).json({error: error.message})
  }
}

const getFlashcards = async(req, res) => {
  try {
    const legit = await userOfRequest(req);
    if(legit) {
      const categoryId = req.params.id;
      const flashcards = await Flashcard.find(
        {"category": categoryId}
      );
      return res.status(200).json(categories);
    }
    return res.status(401).send("Not Authorized");

  } catch(error) {
    return res.status(500).json({error: error.message})
  }
}


module.exports = {
  // export using names of functions in this object
}
