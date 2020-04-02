const JwtStrategy = require("passport-jwt").Strategy; // Use JWT Strategy for passport authentication
const ExtractJwt = require("passport-jwt").ExtractJwt; // JWT Extractor function. Accepts request as parameter and returns token string or null
const mongoose = require("mongoose");
const keys = require("./keys");

const User = require("../models/User");

const options = {}; // Set up for JWT Strategy
// Two required parameters
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // Look for JWT from the Auth Header of a request
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  // Set up passport auth strategy. Strategy is the term for "authentication method" in passport
  // jwt_payload is the user info carried by the token. In this app, the user id in the database will be included in it
  // The user id then allows us to search for the user in the db
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(error => console.log(error));
  }));
}
