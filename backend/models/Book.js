const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let bookSchema = new Schema({
  name: String,
  author: String,
  description: String,
  genre: String,
  image: {
    data: Buffer,
    contentType: String
  }
}, {
  collection: 'books'
});

module.exports = mongoose.model('Book', bookSchema);
