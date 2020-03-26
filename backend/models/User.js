const mongoose = require("mongoose");
// Books Model
const bookSchema = require("../models/Book");
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  books: [bookSchema] // A collection of books by user
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
