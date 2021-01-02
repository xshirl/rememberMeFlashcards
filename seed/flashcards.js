const db = require('../db')
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Flashcard = require('../models/flashcard');
const Category  = require('../models/category');
// sort of boilerplate error checking method
// for database connection to mongoDB
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
const SALT_ROUNDS = 11;

// write a function that adds initial data to database
// we made author not required in the schema
const main = async () => {
  // array of posts that have the right keys for our schema

  await User.deleteMany()
  await Flashcard.deleteMany()
  await Category.deleteMany()

  const users = [
    {
      username: "xshirl",
      name: "Shirley",
      password_digest: bcrypt.hashSync('12345', SALT_ROUNDS),

    }
  ]
  const seededUsers = await User.insertMany(users);
  console.log("Successfully created users");

  const categories = [
    {
      name: "Java",
      author: seededUsers[0]['_id']
    },
    {
      name: "Javascript",
      author: seededUsers[0]['_id']
    }
  ]

  const seededCategories = await Category.insertMany(categories);
  console.log("Successfully created categories");


  const flashcards = [
    {
      question: "What are qualities of Java language?",
      answer: "Multithreaded, platform-independent, robust, portable, statically typed",
      difficulty: 1,
      category: seededCategories[0]["_id"],
      author: seededUsers[0]['_id']

    },
    {
      question: "What are three principles of object oriented programming",
      answer: "Encapsulation, polymorphism, and inheritance",
      difficulty: 1,
      category: seededCategories[0]["_id"],
      author: seededUsers[0]['_id']
    },
    {
      question: "What is functional programming?",
      answer: "Uses pure functions with no side effects and higher order functions",
      difficulty: 1,
      category: seededCategories[1]["_id"],
      author: seededUsers[0]['_id']
    },
    {
      question: "What is Node.js?",
      answer: "A framework built on v8 engine that is used for server side programming and is asynchronous",
      difficulty: 1,
      category: seededCategories[1]["_id"],
      author: seededUsers[0]['_id']
    },
  ]

  // insertMany creates the table if it doesn't exist
  await Flashcard.insertMany(flashcards);
  console.log('Seeded flashcards!')
}

// call main (which is async) and close the database connection after (so after await main())
const run = async () => {
  try {
    await main();
    db.close();
  } catch(error) {
    console.log(error);
  }

}

// run 'run'
run()
