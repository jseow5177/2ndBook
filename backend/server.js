require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConfig = require("./database/db"); // db connection

const session = require("express-session");
const passport = require("passport");
const User = require("./models/User");

// Express route
const bookRoute = require("./routes/book.route");
const userRoute = require("./routes/user.route");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// Configure and setup session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

// initialize passport and use it with session
app.use(passport.initialize());
app.use(passport.session());

// passport config
// Simplified code by passport-local and passport-local-mongoose
// The original code to set up strategy, serialize and deserialize by passport is much more complex
// Refer to documentation for more details
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", bookRoute);
app.use("/", userRoute);

// Connect to MongoDB database;
mongoose.connect(dbConfig.db, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}).then(() => {
  console.log("Database successfully connected!");
}).catch((error) => {
  console.log(`Database not connected: ${error}`);
});

mongoose.set("useCreateIndex", true);

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
