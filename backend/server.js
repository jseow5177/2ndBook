const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConfig = require("./database/db"); // db connection

// Express route
const bookRoute = require("./routes/book.route");

// Connect to MongoDB database;
mongoose.connect(dbConfig.db, {useNewUrlParser: true, useFindAndModify: false}).then(() => {
  console.log("Database successfully connected!");
}).catch((error) => {
  console.log(`Database not connected: ${error}`);
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use("/", bookRoute);

// Port
//process.env is a global variable injected by Node at runtime
// It represents the state of the system environment of your application
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

// 404
app.use((req, res, next) => {
  res.status(404).send("Sorry page not found!");
})
