const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const multer = require("multer"); // File handling npm package
const fs = require("fs");

// Store images at ./static/uploads
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/')
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // timestamp
    callback(null, file.fieldname + "-" + uniqueSuffix);
  }
})

const upload = multer({ storage: storage })

// Books Model
const Book = require("../models/Book");

// GET all Books
router.route("/").get((req, res, next) => {
  Book.find((error, foundBooks) => {
    if (error) {
      return next(error); // return ends the function
    } else {
      res.status(200).json(foundBooks);
    }
  })
});

// GET a single Book
router.route("/edit-book/:id").get((req, res, next) => {
  Book.findById(req.params.id, (error, foundBook) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(foundBook);
    }
  })
});

// POST a single Book
// Accepts a single file. "image" is the fieldname
router.route("/add-book").post(upload.single("image"), (req, res, next) => {

  if (req.file) {
    const newBook = new Book({
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      genre: req.body.genre,
      image: {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype
      }
    });
    newBook.save((error, savedBook) => {
      if (error) {
        return next(error);
      } else {
        console.log(savedBook);
        res.status(201).json(savedBook); // New book created
      }
  });
} else {
    console.log("No file uploaded");
  }
});

// PUT (update) a single Book
router.route("/update-book/:id").put(upload.single("image"), (req, res, next) => {

  if (req.file) {
    const updateBook = {
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      genre: req.body.genre,
      image: {
        data: req.file.path,
        contentType: req.file.mimetype
      }
    };
    Book.findByIdAndUpdate(req.params.id, updateBook, (error, updatedBook) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.status(200).json(updatedBook); // Page changes to newly updated page
        console.log("Book updated successfully!");
      }
    })
  } else {
    console.log("No file uploaded");
  }

});

// DELETE a single Book
router.route("/delete-book/:id").delete((req, res, next) => {

  Book.findByIdAndRemove(req.params.id, (error, deletedBook) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(deletedBook);
    }
  })

});

module.exports = router;
