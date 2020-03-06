import React from "react";
import Nav from "react-bootstrap/Nav"; // Single nav element
import Navbar from "react-bootstrap/Navbar"; // The entire Navbar
import Button from 'react-bootstrap/Button'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <header className="App-header">
        <Navbar className="nav-bar justify-content-between">

          <Navbar.Brand>
            <Link to={"/"} className="nav-link">
              <LibraryBooksIcon color="secondary"/>
              <h1>Bookstagram</h1>
            </Link>
          </Navbar.Brand>

          <Nav>

            <Nav.Item>
              <Link to={"/add-book"}>
                <Button variant="danger">
                  Add
                </Button>
              </Link>
            </Nav.Item>

            { /*
            <Nav.Item>
              <Link to={"/browse-book"} className="nav-link">
                <h2>Browse</h2>
              </Link>
            </Nav.Item>
            */}

          </Nav>
        </Navbar>
      </header>
    </div>
  )
}

export default Header;
