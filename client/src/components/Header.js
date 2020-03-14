import React, {useState} from "react";
import Nav from "react-bootstrap/Nav"; // Single nav element
import Navbar from "react-bootstrap/Navbar"; // The entire Navbar
import Button from 'react-bootstrap/Button'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Login from "./Login";

import { Link } from "react-router-dom";

function Header() {

  const [isVisible, setIsVisible] = useState(false);

  const showForm = () => {
    setIsVisible(true);
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
              <button className="link-btn">Register</button>
            </Nav.Item>

            <Nav.Item>
              <Login isVisible={isVisible} setIsVisible={setIsVisible}/>
              <button className="link-btn" onClick={showForm}>Login</button>
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
