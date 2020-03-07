import React from "react";
import Container from "react-bootstrap/Container";

import 'bootstrap/dist/css/bootstrap.min.css';

// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Browse from "./components/Browse";
import AddBook from "./components/AddBook";
import Header from "./components/Header";
import BookInfo from "./components/BookInfo";
import EditBook from "./components/EditBook";
import NotFound404 from "./components/NotFound404";

function App() {
  return (<Router>
    <div className="App">
      <Header/>
      <Container>
        <div className="main-wrapper">
          <Switch>
            <Route exact path="/" component={Browse}/>
            <Route path="/add-book" component={AddBook}/>
            <Route path="/view-book/:id" component={BookInfo}/>
            <Route path="/edit-book/:id" component={EditBook}/>
            <Route path="" component={NotFound404} />
          </Switch>
        </div>
      </Container>
    </div>
  </Router>
  );
}

export default App;
