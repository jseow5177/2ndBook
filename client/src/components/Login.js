import React, { useState, useEffect} from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
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

  const handleEscape = (event) => {
    const ESCAPE_KEY = 27;
    if (event.keyCode === ESCAPE_KEY) {
      props.setIsVisible(false);
    }
  }

  const closeForm = () => {
    props.setIsVisible(false);
  }

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => isSubscribed = false;
  });

  return(
    <div style={{visibility: props.isVisible ? "visible" : "hidden"}}>
      <Form className="user-form">
        <Tooltip title="close" placement="left">
          <CloseIcon className="close-btn" onClick={closeForm}/>
        </Tooltip>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" value={username} onChange={changeUsername}/>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={changePassword}/>
        </Form.Group>
        <Button className="login-btn" variant="success" type="submit">
          Log in
        </Button>
        <Form.Text style={{textAlign: "center"}}>Don't have an account? Sign up</Form.Text>
      </Form>
      <div style={props.isVisible ? blurBackground : null}></div>
    </div>
  )
}

export default Login;
