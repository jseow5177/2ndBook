/* Show more information of a book after a card is clicked */

import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {renderImage} from "../../helper/image.js";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import EditAttributesIcon from "@material-ui/icons/EditAttributes";

function BookInfo(props) {

  const [bookOwner, setBookOwner] = useState({
    ownerId: "",
    ownerName: ""
  });

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

  // Get all the relevant information of the book
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      axios.get(`http://localhost:4000/books/${props.match.params.id}`).then(res => {
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

  // Find the owner of the book
  useEffect(() => {
    axios.get(`http://localhost:4000/books/${props.match.params.id}/user`).then(res => {
      setBookOwner({
        ownerId: res.data.ownerId,
        ownerName: res.data.ownerName
      });
    }).catch(error => {
      console.log(error.response.data);
    });
  }, [props.match.params.id])

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
      props.history.replace(`/users/profile/${props.auth.user.id}`);
    }).catch(error => {
      console.log(error.response.data);
    })
  }

  return (
    <div className="bookinfo-wrapper">
      <Row>
        <Col className="bookinfo-image-wrapper" md={6} xs={12}>
          <img src={renderImage(oldBook.imageBuffer, oldBook.imageType)} alt={oldBook.bookName}/>
          {
            !isForbidden ? 
            (<div>
              <Tooltip 
                title="Edit record" 
                placement="bottom">
                  <Link to={`/books/edit/${props.match.params.id}`}><EditIcon className="icon"/></Link>
              </Tooltip>
              <Tooltip 
                title="Delete record" 
                placement="bottom">
                  <DeleteIcon className="icon" onClick={() => deleteBook(props.match.params.id)}/>
              </Tooltip>
            </div>) : null
          }
        </Col>
        <Col md={6} xs={12}>
          <div className="book-owner-wrapper">
            <AccountCircleIcon style={{color: "#808080"}}/>
            <Link to={`/users/profile/${bookOwner.ownerId}`}><Button className="uploaded-by-link" variant="link">{bookOwner.ownerName}</Button></Link>
          </div>
          <h2>{oldBook.bookName}</h2>
          <hr/>
          <p><EditAttributesIcon/> {oldBook.author}</p> 
          <p><MenuBookIcon/> {oldBook.genre}</p>
          <hr/>
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
