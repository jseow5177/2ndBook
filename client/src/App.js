import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

// Components
import Browse from "./components/layout/Browse";
import AddBook from "./components/book/AddBook";
import Header from "./components/layout/Header";
import BookInfo from "./components/layout/BookInfo";
import EditBook from "./components/book/EditBook";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import NotFound404 from "./components/layout/NotFound404";

// Check if a token is present in Local Storage if user revisit website
if (window.localStorage.jwtToken) {
  // Get token
  const token = window.localStorage.jwtToken;
  // Set token to auth header
  setAuthToken(token);
  // Get user info
  const decoded = jwt_decode(token);
  // Set current user. With a non-empty payload, isAuthenticated is set to true
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
  if (decoded.exp < currentTime) {
    // Delete auth header. Delete local storage in token
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }

}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <Container>
          <div className="main-wrapper">
            <Switch>
              <Route exact path="/" component={Browse}/>
              <PrivateRoute exact path="/add-book" component={AddBook}/>
              <Route exact path="/view-book/:id" component={BookInfo}/>
              <Route exact path="/edit-book/:id" component={EditBook}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route path="" component={NotFound404} />
            </Switch>
          </div>
        </Container>
    </Router>
  </Provider>
  );
}

export default App;
