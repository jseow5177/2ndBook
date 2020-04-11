import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import BookCard from "./BookCard";
import Search from "./Search";
import axios from "axios";
import { v1 as uuidv1 } from "uuid"; // Timestamp unique id

function Browse() {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("Name"); // Search bar filter

  /*
   Note:
   This component “subscribes” to a promise by axios.get, but it never “unsubscribes” or cancels the request.
   If for any reason, the component is unmounted before the promise resolves, the code will try to “set state” (calling setBooks) on an unmounted component.
   This will throw a warning.
   */

  useEffect(() => {
    let isSubscribed = true;

    axios.get("http://localhost:4000/").then(res => {
      if (isSubscribed) { // Make sure setBooks is not executed when component is unmounted
        setBooks(res.data);
      }
    }).catch(error => {
      console.log(error.response.data);
    });

    return () => isSubscribed = false;

  }, []);

  let filteredBooks = books.filter(book => {
    // Access key as variable
    return book[searchBy.toLowerCase()].toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  return(
    <div>
      <Search searchBy={searchBy} setSearchBy={setSearchBy} search={search} setSearch={setSearch}/>
      <Row className="card-deck">
        {filteredBooks.length === 0 ? <h1 className="no-results">No books found</h1> : null}
        {filteredBooks.map(book => 
          <BookCard 
            key={uuidv1()} 
            id={book._id} 
            name={book.name} 
            author={book.author}
            description={book.description} 
            genre={book.genre} 
            image={book.image} />)}
      </Row>
    </div>
  )
}

export default Browse;
