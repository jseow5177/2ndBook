const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const multer = require("multer"); 

const router = express.Router();

const storage = multer.memoryStorage(); // Default option. Store in memory
const upload = multer({ storage: storage });

const {getLoggedinUser} = require("../middleware/user.js"); // Get the logged in user 

// User Model
const User = require("../models/User");

// Input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Register endpoint
// 1. Get errors and isValid from validateRegisterInput(req.body)
// 2. If input valid, MongoDB's User.findOne() will check if username already exists
// 3. If new user, fill in name, email and password and save in database
// 4. Use bcryptjs to hash password before storing

router.route("/register").post((req, res, next) => {

  // Validate input
  const {errors, isValid} = validateRegisterInput(req.body);

  // If input not valid, send errors back to front end
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check if email exists
  User.findOne({email: req.body.email}).then(user => {
    if (user) {
      return res.status(400).json({email: "Email already exists"});
    } else { // If email doesn't exist
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        bio: "",
        image: {
          data: [],
          contentType: ""
        }
      });
      // Hash password with 10 salt rounds
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw (error);
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(error => console.log(error));
        });
      });
    }
  });

});

// Login endpoint
// 1. Get errors and isValid from validateRegisterInput(req.body)
// 2. If valid input, MongoDB's User.findOne() will check if username exists
// 3. If user exists, bcrypt.js will compare the submitted password with the hashed password in the db
// 4. If passwords match, create jwt_payload (contains username and user id)
// 5. Sign jwt_paylod with keys.secretOrKey from keys.js
// 6. If successful, append the token to a Bearer string

router.route("/login").post((req, res, next) => {

  // Validate input
  const {errors, isValid} = validateLoginInput(req.body);

  // If input not valid, send errors back to front end
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: email}).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({emailNotFound: "Email not found"});
    }

    // If user exists
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { // Create payload
          id: user.id,
          username: user.username
        }
        // Sign payload
        jwt.sign(payload, keys.secretOrKey, {expiresIn: 31556926}, (error, token) => {
          res.status(200).json({
            success: true,
            token: "Bearer" + token
          });
        });
      } else {
        return res.status(400).json({passwordIncorrect: "Password incorrect"});
      }
    });
  });
});

// Get user profile
router.route(["/profile/:id", "/edit/:id"]).get(async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    if (!foundUser) {
      return res.status(404).json({error: "User not found"});
    }
    return res.status(200).json(foundUser);
  } catch(error) {
    return res.status(500).json({error: error.message});
  }
});

// PUT (update) user profile
router.route("/edit/:id").put(getLoggedinUser, upload.single("image"), async (req, res) => {

  const user = {
    username: req.body.username,
    bio: req.body.bio,
  }

  if (req.file) { // If there is new image
    user.image = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    }
  }

  const updateUser = {...res.loggedinUser._doc, ...user}

  try {
    const updatedUser = await User.updateOne({_id: req.params.id}, updateUser);
    return res.status(200).json({message: "User updated!"});
  } catch(error) {
    return res.status(500).json({error: error.message});
  }

});

module.exports = router;
