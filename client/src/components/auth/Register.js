import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, withRouter, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

function Register(props) {
  let history = useHistory();

  const [registerForm, setRegisterForm] = useState({
    emailRegister: "",
    usernameRegister: "",
    passwordRegister: "",
    confirmPasswordRegister: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.error) {
      setErrors(props.error);
    }
    if (props.auth.isAuthenticated) {
      history.push("/")
    }
  }, [props.error, props.auth.isAuthenticated, history])

  const onRegisterInputChange = (event) => {
    setRegisterForm({...registerForm, [event.target.id]: event.target.value});
  }

  // New user register
  const submitRegisterForm = (event) => {
    event.preventDefault();

    const registerFormData = {
      email: registerForm.emailRegister,
      username: registerForm.usernameRegister,
      password: registerForm.passwordRegister,
      password2: registerForm.confirmPasswordRegister
    }

    props.registerUser(registerFormData, history);
  }

  return(
    <div className="user-form-wrapper">
      <Form noValidate onSubmit={submitRegisterForm}>
        <h4><b>Register</b> below!</h4>
        <p>Already have an account? <Link className="small-link" to={"/users/login"}>Login</Link> </p>
        <Form.Group>
          <Form.Control id="emailRegister" className="user-form-input" type="text" placeholder=" " value={registerForm.emailRegister} error={errors.email} onChange={onRegisterInputChange} autoComplete="off"/>
          <span className="floating-label">Email</span>
          <span className="error-message">{errors.email}</span>
        </Form.Group>
        <Form.Group>
          <Form.Control id="usernameRegister" className="user-form-input" type="text" placeholder=" " value={registerForm.usernameRegister} error={errors.username} onChange={onRegisterInputChange} autoComplete="off"/>
          <span className="floating-label">Username</span>
          <span className="error-message">{errors.username}</span>
        </Form.Group>
        <Form.Group>
          <Form.Control id="passwordRegister" className="user-form-input" type="password" placeholder=" " value={registerForm.passwordRegister} error={errors.password} onChange={onRegisterInputChange}/>
          <span className="floating-label">Password</span>
          <span className="error-message">{errors.password}</span>
        </Form.Group>
        <Form.Group>
          <Form.Control id="confirmPasswordRegister" className="user-form-input" type="password" placeholder=" " value={registerForm.confirmPasswordRegister} error={errors.password2} onChange={onRegisterInputChange}/>
          <span className="floating-label">Confirm Password</span>
          <span className="error-message">{errors.password2}</span>
        </Form.Group>
        <div className="form-btn-wrapper">
          <Button className="user-form-btn" variant="success" type="submit">Sign up</Button>
        </div>
      </Form>
    </div>
  )
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

const mapDispatchToProps = dispatch => {
  return {
      registerUser: (registerFormData, history) => dispatch(registerUser(registerFormData, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
