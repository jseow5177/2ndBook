const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  author: String,
  description: String,
  genre: String,
  image: {
    data: Buffer,
    contentType: String
  }
}, {
  collection: "books"
});

//module.exports = mongoose.model('Book', bookSchema);

module.exports = bookSchema;
