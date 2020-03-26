import React from "react";
import Nav from "react-bootstrap/Nav"; // Single nav element
import Navbar from "react-bootstrap/Navbar"; // The entire Navbar
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

function Header() {
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
              <button className="link-btn"><Link to={"/register"}>Register</Link></button>
            </Nav.Item>

            <Nav.Item>
              <button className="link-btn"><Link to={"/login"}>Login</Link></button>
            </Nav.Item>

            <Nav.Item>
              <Link to={"/add-book"}><Button variant="danger">Add Book</Button></Link>
            </Nav.Item>
          </Nav>

        </Navbar>
      </header>
    </div>
  )
}

export default Header;
