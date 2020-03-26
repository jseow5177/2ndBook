require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConfig = require("./database/db"); // db connection
var session = require("express-session");
const passport = require("passport");

// Express route
const bookRoute = require("./routes/book.route");
const userRoute = require("./routes/user.route");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB database;
mongoose.connect(dbConfig.db, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}).then(() => {
  console.log("Database successfully connected!");
}).catch((error) => {
  console.log(`Database not connected: ${error}`);
});
mongoose.set("useCreateIndex", true);

// Configure and setup session
const sessionMiddleware = session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
});
app.use(sessionMiddleware);

// initialize passport and use it with session
// passport.initialize middleware is invoked on every request. It ensures the session contains a passport.user object.
app.use(passport.initialize());
// passport.session middleware is a Passport Strategy which will load the user object onto req.user if a serialised user object was found in the server.
app.use(passport.session());

app.use("/user", userRoute);
app.use("/", bookRoute);

const User = require("./models/User");

// Use LocalStrategy that checks username and password
// Received req.body.username and req.body.password from passport.authenticate
passport.use(User.createStrategy());

// req.login calls passport.serializeUser upon successful authentication
// Save user id into session
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

// passport.deserializeUser is invoked on every request by passport.session.
// It enables us to load additional user information on every request.
//This user object is attached to the request as req.user making it accessible in our request handling.
passport.deserializeUser(function(id, done) {
    console.log(id);
    User.findById(id, function(err, user) {
        done(false, user);
    });
});


// Port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
