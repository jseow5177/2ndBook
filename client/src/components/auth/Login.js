import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link , useHistory} from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

function Login(props) {

  let history = useHistory();

  const [loginForm, setLoginForm] = useState({
    emailLogin: "",
    passwordLogin: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.error) {
      setErrors(props.error);
    }
    if (props.auth.isAuthenticated) {
      history.push("/");
    }
  }, [props.error, history, props.auth.isAuthenticated]);

  const onLoginInputChange = (event) => {
    setLoginForm({...loginForm, [event.target.id]: event.target.value});
  }

  const submitLoginForm = (event) => {
    event.preventDefault();

    const loginFormData = {
      email: loginForm.emailLogin,
      password: loginForm.passwordLogin,
    }

    props.loginUser(loginFormData);
  }

  return(
    <div className="user-form-wrapper">
      <Form noValidate onSubmit={submitLoginForm}>
        <h4><b>Login</b> below!</h4>
        <p>Don't have an account? <Link className="small-link" to={"/users/register"}>Register</Link> </p>
        <Form.Group>
          <Form.Control id="emailLogin" className="user-form-input" type="text" placeholder=" " value={loginForm.emailLogin}  onChange={onLoginInputChange} autoComplete="off"/>
          <span className="floating-label">Email</span>
          <span className="error-message">{errors.email}{errors.emailNotFound}</span>
        </Form.Group>
        <Form.Group>
          <Form.Control id="passwordLogin" className="user-form-input" type="password" placeholder=" " value={loginForm.passwordLogin} onChange={onLoginInputChange}/>
          <span className="floating-label">Password</span>
          <span className="error-message">{errors.password}{errors.passwordIncorrect}</span>
        </Form.Group>
        <div className="form-btn-wrapper">
          <Button className="user-form-btn" variant="success" type="submit">Login</Button>
        </div>
      </Form>
    </div>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (loginFormData) => dispatch(loginUser(loginFormData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
