import React from "react";
import Container from "react-bootstrap/Container";

import 'bootstrap/dist/css/bootstrap.min.css';

// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Browse from "./components/layout/Browse";
import AddBook from "./components/book/AddBook";
import Header from "./components/layout/Header";
import BookInfo from "./components/layout/BookInfo";
import EditBook from "./components/book/EditBook";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NotFound404 from "./components/layout/NotFound404";

function App() {
  return (<Router>
    <div className="App">
      <Header/>
      <Container>
        <div className="main-wrapper">
          <Switch>
            <Route exact path="/" component={Browse}/>
            <Route exact path="/add-book" component={AddBook}/>
            <Route exact path="/view-book/:id" component={BookInfo}/>
            <Route exact path="/edit-book/:id" component={EditBook}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route path="" component={NotFound404} />
          </Switch>
        </div>
      </Container>
    </div>
  </Router>
  );
}

export default App;
