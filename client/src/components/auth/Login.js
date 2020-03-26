import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import axios from "axios";

function Login(props) {

  const [loginForm, setLoginForm] = useState({
    emailLogin: "",
    passwordLogin: "",
  });

  const onLoginInputChange = (event) => {
    setLoginForm({...loginForm, [event.target.id]: event.target.value});
  }

  const submitLoginForm = (event) => {
    event.preventDefault();

    const loginFormData = {
      email: loginForm.emailLogin,
      password: loginForm.passwordLogin,
    }

    axios.post("http://localhost:4000/user/login", loginFormData).then(res => {
      console.log(res.data);
      props.setIsLoggedIn(res.data); // Tells Header component that user is logged in
    }).catch(error => {
      console.log(error);
    });

    setLoginForm({});
  }

  return(
    <div className="user-form-wrapper">
      <Form noValidate onSubmit={submitLoginForm}>
        <h4><b>Login</b> below!</h4>
        <p>Don't have an account? <Link className="small-link" to={"/register"}>Register</Link> </p>
        <Form.Group>
          <Form.Control id="emailLogin" className="user-form-input" type="text" placeholder=" " value={loginForm.emailLogin} onChange={onLoginInputChange} autoComplete="off"/>
          <span className="floating-label">Email</span>
        </Form.Group>
        <Form.Group>
          <Form.Control id="passwordLogin" className="user-form-input" type="password" placeholder=" " value={loginForm.passwordLogin} onChange={onLoginInputChange}/>
          <span className="floating-label">Password</span>
        </Form.Group>
        <div className="form-btn-wrapper">
          <Button className="user-form-btn" variant="success" type="submit">Login</Button>
        </div>
      </Form>
    </div>
  )
}

export default Login;
