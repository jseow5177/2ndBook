const Validator = require("validator");
const isEmpty = require("is-empty");

const validateRegisterInput = (data) => {

  // Store any errors occured
  let errors = {};

  // Convert empty fields to empty string (Validator checks empty strings)
  data.username = isEmpty(data.username) ? "" : data.username;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password2 = isEmpty(data.password2) ? "" : data.password2;

  // Check username
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  // Check email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    error.email = "Email is invalid";
  }

  // Check password
  // First check if empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }

  // Then, check if password entered has a length of at least 6
  if (!Validator.isLength(data.password, {min: 6})) {
    errors.password = "Password must be at least 6 characters";
  }

  // Finally, check if confirm password matches password entered
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };

};

module.exports = validateRegisterInput;
