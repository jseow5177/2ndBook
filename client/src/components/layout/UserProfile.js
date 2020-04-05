import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import BookCard from "./BookCard";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import axios from "axios";
import { v1 as uuidv1 } from "uuid"; // Timestamp unique id

function UserProfile(props) {

  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      axios.get("http://localhost:4000/users/" + props.match.params.id).then(res => {
        setUserBooks(res.data);
      }).catch(error => {
        console.log(error.response.data);
      })
    }

    return () => isSubscribed = false;
  }, [props.match.params.id]);

  return (
    <div>
      <div className="profile-section">
        <Image src="https://media.karousell.com/media/photos/profiles/default.png" roundedCircle/>
        <h2 style={{margin: "1rem 0"}}>{props.auth.user.username}</h2>
        <Button variant="outline-secondary">Let's chat!</Button>
      </div>
      <hr/>
      <Row className="card-deck">
        {userBooks.length === 0 ? <h1 className="no-results">No books found</h1> : null}
        {userBooks.map(book => <BookCard key={uuidv1()} id={book._id} name={book.name} author={book.author} description={book.description} genre={book.genre} image={book.image} />)}
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(UserProfile);
