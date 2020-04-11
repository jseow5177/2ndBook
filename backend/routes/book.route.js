const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const multer = require("multer"); 
const bookSchema = require("../models/Book");
const {getLoggedinUser} = require("../middleware/user.js"); // Get the logged in user 
const shuffle = require("../shuffle");

// Books Model
const Book = new mongoose.model("Book", bookSchema);
// User Model
const User = require("../models/User");

const storage = multer.memoryStorage(); // Default option. Store in memory
const upload = multer({ storage: storage });

// GET all Books
// Accessible by all users. Do not require authentication
router.route("/").get(async (req, res) => {

  let allBooks = [];

  try {
    const allUsers = await User.find(); 
    allUsers.map(user => {
      const userBooks = user.books;
      allBooks = [...allBooks, ...userBooks];
    });

    // To not have books of the same users cluttered together
    // Definitely not the best implementation, but simple enough for this pet project
    allBooks = shuffle(allBooks);

    return res.status(200).json(allBooks);
  } catch(error) {
    return res.status(500).json({error: error.message});
  }

});

// GET the information of a specific book
// Accessible by all users. Do not require authentication
router.route("/books/:id").get(getLoggedinUser, async (req, res) => {

  let isForbidden = true;

  try {
    const user = await User.findOne({"books._id": req.params.id}); // Find the user with the book

    if(res.loggedinUser !== null && res.loggedinUser.id === user._id.toString()) { // Check if the book belongs to the logged in user
      isForbidden = false; // This controls whether the user can edit or delete the book
    }

    const userBooks = user.books;
    const foundBook = userBooks.find(userBook => {
      return userBook._id.toString() === req.params.id
    });
    if (foundBook === null) {
      return res.status(404).json({error: "Book not found"}); // NEED TO RENDER 404
    }
    return res.status(200).json({
      book: foundBook,
      permission: isForbidden
    });

  } catch (error) {
    return res.status(500).json({error: error.message});
  }

});

// GET books of loggedinUser
// Accessible in profile page by loggedinUser
// router.route("/users/:id").get(getLoggedinUser, (req, res) => {

//   const userBooks = res.loggedinUser.books;
//   return res.status(200).json(userBooks);

// });

// Retrive data of a user for his/her profile page
router.route("/users/:id").get(async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    if (!foundUser) {
      return res.status(404).json({error: "User not found"});
    }
    return res.status(200).json(foundUser);
  } catch(error) {
    return res.status(500).json({error: error.message});
  }
});

// POST book to loggedinUser account
// Requires authentication. Can only be performed by loggedinUser
router.route("/books/add").post(getLoggedinUser, upload.single("image"), async(req, res) => {

  const newBook = new Book({
    name: req.body.name,
    author: req.body.author,
    description: req.body.description,
    genre: req.body.genre,
    userId: req.body.userId,
    image: {
      data: req.file.buffer, // Buffer data in memory
      contentType: req.file.mimetype
    }
  });

  res.loggedinUser.books.push(newBook);

  try {
    const updatedUser = await res.loggedinUser.save(); // Save to User
    return res.status(200).json(updatedUser);
  } catch(error) {
    return res.status(400).json({error: error.message});
  }

});


// PUT (update) book to loggedinUser account
// Requires authentication. Can only be performed by loggedinUser on his or her books
router.route("/books/edit/:id").put(getLoggedinUser, upload.single("image"), async (req, res) => {

  const updateBook = {
    name: req.body.name,
    author: req.body.author,
    description: req.body.description,
    genre: req.body.genre
  }

  if (req.file) { // If there is new image
    updateBook.image = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    }
  }

  res.loggedinUser.books.forEach((userBook, index) => {
    if (userBook._id.toString() === req.params.id) {
      res.loggedinUser.books[index] = {...userBook._doc, ...updateBook};
    }
  });

    try {
      const updatedUser = await res.loggedinUser.save();
      return res.status(200).json(updatedUser);
    } catch(error) {
      return res.status(500).json({error: error.message});
    }

});

// DELETE a single Book
// Requires authentication. Can only be performed by loggedinUser on his or her books
router.route("/books/:id").delete(getLoggedinUser, async (req, res) => {

  res.loggedinUser.books.forEach((userBook, index) => {
    if (userBook._id.toString() === req.params.id) {
      res.loggedinUser.books.splice(index, 1);
    }
  });

  try {
    const updatedUser = await res.loggedinUser.save();
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }

});

// Get the owner of the book
router.route("/books/:id/user").get(async (req, res) => {
  try {
    const ownerData = await User.findOne({"books._id": req.params.id});
    if (!ownerData) {
      return res.status(404).json({error: "Owner of book not found"});
    }
    const bookOwner = {
      ownerId: ownerData._id,
      ownerName: ownerData.username
    }
    return res.status(200).json(bookOwner);
  } catch(error) {
    return res.status(500).json({error: error.message});
  }
});

module.exports = router;
