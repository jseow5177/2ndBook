/* Show more information of a book after a card is clicked */

import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import axios from "axios";
import {renderImage} from "../../helper/image.js";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

function BookInfo(props) {

  const [oldBook, setOldBook] = useState({
    bookName: "",
    author: "",
    bookDes: "",
    genre: "",
    imageBuffer: [],
    imageType: ""
  });

  const [isForbidden, setIsForbidden] = useState(); // Check if the user can edit or delete the book

  const [isMore, setIsMore] = useState("more"); // Whether "Read More" is required

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      axios.get("http://localhost:4000/books/" + props.match.params.id).then(res => {
        setOldBook({
          bookName: res.data.book.name,
          author: res.data.book.author,
          bookDes: res.data.book.description,
          genre: res.data.book.genre,
          imageBuffer: res.data.book.image.data.data,
          imageType: res.data.book.image.contentType
        })
        setIsForbidden(res.data.permission);
      }).catch(error => {
        console.log(error.response.data);
      });
    }

    return () => isSubscribed = false;
  }, [props.match.params.id]);

  const readMore = () => {
    if (isMore === "more") {
      setIsMore("less");
    } else {
      setIsMore("more");
    }
  }

  const deleteBook = (bookId) => {
    axios.delete("http://localhost:4000/books/" + bookId).then(res => {
      console.log("Successfully deleted book");
      props.history.replace(`/users/${props.auth.id}`);
    }).catch(error => {
      console.log(error.response.data);
    })
  }

  console.log(isForbidden);

  return (
    <div className="bookinfo-wrapper">
      <Row>
        <Col className="bookinfo-image-wrapper">
          <img src={renderImage(oldBook.imageBuffer, oldBook.imageType)} alt={oldBook.bookName}/>
          {
            !isForbidden ? 
            (<div>
              <Tooltip title="Edit record" placement="bottom"><Link to={`/books/edit/${props.match.params.id}`}><EditIcon className="icon"/></Link></Tooltip>
              <Tooltip title="Delete record" placement="bottom"><DeleteIcon className="icon" onClick={() => deleteBook(props.match.params.id)}/></Tooltip>
            </div>) : null
          }
        </Col>
        <Col>
          <h2 style={{display: "inline-block"}}>{oldBook.bookName}</h2>
          <p>{oldBook.author} | {oldBook.genre}</p>
          {/* "Read More" if text longer than 530 */}
          <p className="book-des">{isMore === "more" ? oldBook.bookDes.substring(0, 530) : oldBook.bookDes}</p>
          {oldBook.bookDes.length > 530 ? <button className="read-more" onClick={readMore}>Read {isMore}</button> : null}
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(BookInfo);
