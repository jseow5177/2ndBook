const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
// const session = require("express-session");
const passport = require("passport");
const User = require("../models/User");

router.route("/register").post((req, res, next) => {

  const newUser = new User({
    username: req.body.username,
    email: req.body.email
  });

  // Register new User with password
  // Password will be automatically hashed and salted
  User.register(newUser, req.body.password, (error, user) => {
    if (error) {
      next(error);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.json(user);
      })
    }
  })
});

router.route("/login").post((req, res, next) => {

  console.log(req.body);

  const loggedInUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(loggedInUser, error => {
    if (error) {
      next(error);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    }
  });

});

module.exports = router;
