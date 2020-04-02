const Validator = require("validator");
const isEmpty = require("is-empty");

const validateLoginInput = (data) => {

  // Store any errors occured
  let errors = {};

  // Convert empty fields to empty string (Validator checks empty strings)
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;

  // Check email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    error.email = "Email is invalid";
  }

  // Check password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };

};

module.exports = validateLoginInput;
