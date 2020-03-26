const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
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
        res.status(200).json(req.isAuthenticated());
      })
    }
  })
});

router.route("/login").post((req, res, next) => {

  const loggedInUser = new User({
    username: req.body.username,
    password: req.body.password
  });

    passport.authenticate("local", (error, user, failureDetails) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        console.log(failureDetails);
        return;
      }
      // Save user in session
      req.logIn(user, error => {
        if (error) {
          return next(error);
        }
      console.log(req.session);
      res.status(200).json(req.isAuthenticated());
    });
  })(req, res, next);

  // req.login(loggedInUser, error => {
  //   if (error) {
  //     next(error);
  //   } else {
  //     passport.authenticate("local")(req, res, () => {
  //       console.log(req.session);
  //       console.log(req.user);
  //       res.status(200).json(req.isAuthenticated()); // Send login status to Login component
  //     });
  //   }
  // });

});

module.exports = router;
