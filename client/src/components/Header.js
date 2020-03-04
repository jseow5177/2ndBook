import React from "react";
import Nav from "react-bootstrap/Nav"; // Single nav element
import Navbar from "react-bootstrap/Navbar"; // The entire Navbar

import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <header className="App-header">
        <Navbar className="nav-bar">

          <Navbar.Brand>
            <Link to={"/"} className="nav-link">
              <h1>Bookstagram</h1>
            </Link>
          </Navbar.Brand>

          <Nav>

            <Nav.Item>
              <Link to={"/add-book"} className="nav-link">
                <h2>Add</h2>
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
