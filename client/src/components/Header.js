import React, {useState} from "react";
import Nav from "react-bootstrap/Nav"; // Single nav element
import Navbar from "react-bootstrap/Navbar"; // The entire Navbar
import Button from 'react-bootstrap/Button'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Login from "./Login";
import Register from "./Register";

import { Link } from "react-router-dom";

function Header() {

  const [isLogInFormVisible, setLogInFormVisible] = useState(false);
  const [isRegisterFormVisible, setRegisterFormVisible] = useState(false);

  const showLogInForm = () => {
    setLogInFormVisible(true);
  }

  const showRegisterForm = () => {
    setRegisterFormVisible(true);
  }

  return (
    <div>
      <header className="App-header">
        <Navbar className="nav-bar justify-content-between">

          <Navbar.Brand>
            <Link to={"/"} className="nav-link">
              <LibraryBooksIcon color="secondary"/>
              <h1>2ndBook</h1>
            </Link>
          </Navbar.Brand>

          <Nav>
            <Nav.Item>
              <Register isRegisterFormVisible={isRegisterFormVisible} setRegisterFormVisible={setRegisterFormVisible} setLogInFormVisible={setLogInFormVisible}/>
              <button className="link-btn" onClick={showRegisterForm}>Register</button>
            </Nav.Item>

            <Nav.Item>
              <Login isLogInFormVisible={isLogInFormVisible} setRegisterFormVisible={setRegisterFormVisible} setLogInFormVisible={setLogInFormVisible}/>
              <button className="link-btn" onClick={showLogInForm}>Login</button>
            </Nav.Item>

            <Nav.Item>
              <Link to={"/add-book"}>
                <Button variant="danger">Add</Button>
              </Link>
            </Nav.Item>
          </Nav>

        </Navbar>
      </header>
    </div>
  )
}

export default Header;
