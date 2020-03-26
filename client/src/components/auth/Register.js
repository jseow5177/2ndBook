import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

function Register(props) {

  const [registerForm, setRegisterForm] = useState({
    emailRegister: "",
    usernameRegister: "",
    passwordRegister: "",
    confirmPasswordRegister: ""
  });

  const onRegisterInputChange = (event) => {
    setRegisterForm({...registerForm, [event.target.id]: event.target.value});
  }

  // New user register
  const submitRegisterForm = (event) => {
    event.preventDefault();

    const registerFormData = {
      username: registerForm.usernameRegister,
      password: registerForm.passwordRegister,
      email: registerForm.emailRegister
    }

    axios.post("http://localhost:4000/user/register", registerFormData).then(res => {
      props.setIsLoggedIn(res.data);
    }).catch(error => {
        console.log(error)
      });

    setRegisterForm({});
  }

  return(
    <div className="user-form-wrapper">
      <Form noValidate onSubmit={submitRegisterForm}>
        <h4><b>Register</b> below!</h4>
        <p>Already have an account? <Link className="small-link" to={"/login"}>Login</Link> </p>
        <Form.Group>
          <Form.Control id="emailRegister" className="user-form-input" type="text" placeholder=" " value={registerForm.emailRegister} onChange={onRegisterInputChange} autoComplete="off"/>
          <span className="floating-label">Email</span>
        </Form.Group>
        <Form.Group>
          <Form.Control id="usernameRegister" className="user-form-input" type="text" placeholder=" " value={registerForm.usernameRegister} onChange={onRegisterInputChange} autoComplete="off"/>
          <span className="floating-label">Username</span>
        </Form.Group>
        <Form.Group>
          <Form.Control id="passwordRegister" className="user-form-input" type="password" placeholder=" " value={registerForm.passwordRegister} onChange={onRegisterInputChange}/>
          <span className="floating-label">Password</span>
        </Form.Group>
        <Form.Group>
          <Form.Control id="confirmPasswordRegister" className="user-form-input" type="password" placeholder=" " value={registerForm.confirmPasswordRegister} onChange={onRegisterInputChange}/>
          <span className="floating-label">Confirm Password</span>
        </Form.Group>
        <div className="form-btn-wrapper">
          <Button className="user-form-btn" variant="success" type="submit">Sign up</Button>
        </div>
      </Form>
    </div>
  )
}

export default Register;
