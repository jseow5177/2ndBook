import React, { useState, useEffect} from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import {blurBackground} from "../customStyles";

function Register(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const changeUsername = (event) => {
    setUsername(event.target.value);
  }

  const changePassword = (event) => {
    setPassword(event.target.value);
  }

  const changeEmail = (event) => {
    setEmail(event.target.value);
  }

  // Close login form when Escape key is pressed
  const handleEscape = (event) => {
    const ESCAPE_KEY = 27;
    if (event.keyCode === ESCAPE_KEY) {
      props.setRegisterFormVisible(false);
    }
  }

  // Close login form when Close icon is clicked
  const closeRegisterForm = () => {
    props.setRegisterFormVisible(false);
  }

  const closeRegisterOpenLogin = (event) => {
    event.preventDefault();
    props.setLogInFormVisible(true);
    props.setRegisterFormVisible(false);
  }

  // Listen for keydown events
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => isSubscribed = false;
  });

  return(
    <div style={{visibility: props.isRegisterFormVisible ? "visible" : "hidden"}}>
      <Form className="user-form">
        <Tooltip title="close" placement="left">
          <CloseIcon className="close-btn" onClick={closeRegisterForm}/>
        </Tooltip>
        <Form.Group controlId="usernameRegister">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" value={username} onChange={changeUsername}/>
        </Form.Group>
        <Form.Group controlId="passwordRegister">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={changePassword}/>
        </Form.Group>
        <Form.Group controlId="emailRegister">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Email" value={email} onChange={changeEmail}/>
        </Form.Group>
        <Button className="login-btn" variant="success" type="submit">
          Sign up
        </Button>
        <Form.Text style={{textAlign: "center"}}>Have an account? <button className="link-btn small-link" onClick={closeRegisterOpenLogin}>Login now!</button></Form.Text>
      </Form>
      <div style={props.isRegisterFormVisible ? blurBackground : null}></div>
    </div>
  )
}

export default Register;
