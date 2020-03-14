import React, { useState, useEffect} from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import {blurBackground} from "../customStyles";

function Login(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeUsername = (event) => {
    setUsername(event.target.value);
  }

  const changePassword = (event) => {
    setPassword(event.target.value);
  }

  // Close login form when Escape key is pressed
  const handleEscape = (event) => {
    const ESCAPE_KEY = 27;
    if (event.keyCode === ESCAPE_KEY) {
      props.setLogInFormVisible(false);
    }
  }

  // Close login form when Close icon is clicked
  const closeLogInForm = () => {
    props.setLogInFormVisible(false);
  }

  const closeLogInOpenRegister = (event) => {
    event.preventDefault();
    props.setLogInFormVisible(false);
    props.setRegisterFormVisible(true);
  }

  const submitLoginForm = (event) => {
    event.preventDefault();

    const formData = {
      username: username,
      password: password
    }

    axios.post("http://localhost:4000/login", formData).then(res => {
      console.log(res.data);
    }).catch(error => {
      console.log(error);
    });

    setUsername("");
    setPassword("");
    props.setLogInFormVisible(false);
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
    <div style={{visibility: props.isLogInFormVisible ? "visible" : "hidden"}}>
      <Form className="user-form" onSubmit={submitLoginForm}>
        <Tooltip title="close" placement="left">
          <CloseIcon className="close-btn" onClick={closeLogInForm}/>
        </Tooltip>
        <Form.Group controlId="usernameLogin">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" value={username} onChange={changeUsername}/>
        </Form.Group>
        <Form.Group controlId="passwordLogin">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={changePassword}/>
        </Form.Group>
        <Button className="login-btn" variant="success" type="submit">
          Log in
        </Button>
        <Form.Text style={{textAlign: "center"}}>Don't have an account? <button className="link-btn small-link" onClick={closeLogInOpenRegister}>Sign up</button></Form.Text>
      </Form>
      <div style={props.isLogInFormVisible ? blurBackground : null}></div>
    </div>
  )
}

export default Login;
