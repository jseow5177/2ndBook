import React from "react";
import Nav from "react-bootstrap/Nav"; // Single nav element
import Navbar from "react-bootstrap/Navbar"; // The entire Navbar
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { logoutUser } from "../../actions/authActions";

function Header(props) {

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

              {props.auth.isAuthenticated ? (
                <DropdownButton alignRight className="profile-dropdown" title={<AccountCircleIcon style={{color: "#808080"}} fontSize="large"/>}>
                  <Dropdown.Item href={"/users/profile/" + props.auth.user.id}>Profile</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={props.logoutUser}>Logout</Dropdown.Item>
                </DropdownButton>
              ) : null}

            </Nav.Item>

            <Nav.Item>
              {!props.auth.isAuthenticated ? <button className="link-btn"><Link to={"/users/register"}>Register</Link></button> : null}
            </Nav.Item>

            <Nav.Item>
              {!props.auth.isAuthenticated ? <button className="link-btn"><Link to={"/users/login"}>Login</Link></button> : null}
            </Nav.Item>

            <Nav.Item>
              <Link to={"/books/add"}><Button variant="danger">Add Book</Button></Link>
            </Nav.Item>
          </Nav>

        </Navbar>
      </header>
    </div>
  )
}

const mapStateToPros = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default connect(mapStateToPros, mapDispatchToProps)(Header);
