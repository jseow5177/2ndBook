const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const multer = require("multer"); // File handling npm package
const fs = require("fs");
const jwt_decode = require("jwt-decode");
const bookSchema = require("../models/Book");

// Books Model
const Book = new mongoose.model("Book", bookSchema);
// User Model
const User = require("../models/User");

const storage = multer.memoryStorage(); // Default option. Store in memory
const upload = multer({ storage: storage })

/* Get user middleware */
async function getUser(req, res, next) {

  let foundUser;
  const token = req.headers.authorization;
  const decoded = jwt_decode(token);
  const userId = decoded.id;
  try {
    foundUser = await User.findById(userId);
    if (foundUser == null) {
      return res.status(404).json({error: "User not found"}); // NEED TO RENDER 404
    }
  } catch(error) {
    return res.status(500).json({error: error.message});
  }
  res.foundUser = foundUser;
  next();
}

// GET all Books
router.route("/").get(getUser, async (req, res) => {

  try {
    const foundBooks = await Book.find();
    return res.status(200).json(foundBooks);
  } catch(error) {
    return res.status(500).json({error: error.message});
  }

});

// GET a single Book
router.route(["/view-book/:id", "/edit-book/:id"]).get(async (req, res) => {

  try {
    const foundBook = await Book.findById(req.params.id);
    if (foundBook == null) {
      return res.status(404).json({error: "Book not found"}); // NEED TO RENDER 404
    }
    return res.status(200).json(foundBook);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }

});

router.route("/add-book").post(getUser, upload.single("image"), async(req, res) => {

  const newBook = new Book({
    name: req.body.name,
    author: req.body.author,
    description: req.body.description,
    genre: req.body.genre,
    image: {
      data: req.file.buffer, // Buffer data in memory
      contentType: req.file.mimetype
    }
  });

  res.foundUser.books.push(newBook);

  try {
    const updatedUser = await res.foundUser.save();
    const addedBook = await newBook.save();
    return res.status(200).json(updatedUser);
  } catch(error) {
    return res.status(400).json({error: error.message});
  }

});


// PUT (update) a single Book
router.route("/edit-book/:id").put(upload.single("image"), async (req, res) => {

  let updateBook;

  if (req.file) {
    updateBook = {
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      genre: req.body.genre,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    };
  } else { // If no new image is uploaded
    updateBook = {
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      genre: req.body.genre,
    };
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, updateBook, {new: true});
    return res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }

});

// DELETE a single Book
router.route("/delete-book/:id").delete(async (req, res) => {

  try {
    const deletedBook = await Book.findByIdAndRemove(req.params.id);
    return res.status(204).json(deletedBook);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }

});

module.exports = router;
