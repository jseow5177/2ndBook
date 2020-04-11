import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import BookCard from "../layout/BookCard";
import ProfileSection from "./ProfileSection";
import Search from "../layout/Search";
import { connect } from "react-redux";
import axios from "axios";
import { v1 as uuidv1 } from "uuid"; // Timestamp unique id

function UserProfile(props) {

  const [userInfo, setUserInfo] = useState({});
  const [userBooks, setUserBooks] = useState([]);
  const [bookNum, setBookNum] = useState(0);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("Name"); // Search bar filter

  let filteredBooks = userBooks.filter(book => {
    // Access key as variable
    return book[searchBy.toLowerCase()].toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      axios.get("http://localhost:4000/users/" + props.match.params.id).then(res => {
        setUserInfo({
          userId: res.data._id,
          username: res.data.username,
          bio: res.data.bio,
          imageBuffer: res.data.image.data,
          imageType: res.data.image.contentType
        });
        setUserBooks(res.data.books);
        setBookNum(res.data.books.length);
      }).catch(error => {
        console.log(error.response.data);
      })
    }

    return () => isSubscribed = false;
  }, [props.match.params.id]);

  return (
    <div>
      <ProfileSection userInfo={userInfo} bookNum={bookNum}/>
      <Search searchBy={searchBy} setSearchBy={setSearchBy} search={search} setSearch={setSearch}/>
      <Row className="card-deck">
        {filteredBooks.length === 0 ? <h1 className="no-results">No books found</h1> : null}
        {filteredBooks.map(book => <BookCard key={uuidv1()} id={book._id} name={book.name} author={book.author} description={book.description} genre={book.genre} image={book.image} />)}
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(UserProfile);
