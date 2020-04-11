const mongoose = require("mongoose");
// Books Model
const bookSchema = require("../models/Book");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  image: {
    data: Buffer,
    contentType: String
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  books: [bookSchema] // A collection of books by user
});

module.exports = mongoose.model("User", userSchema);
