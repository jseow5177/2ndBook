import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import axios from "axios";
import {renderImage} from "../helper";

import { Link } from "react-router-dom";

function BookInfo(props) {

  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [bookDes, setBookDes] = useState("");
  const [genre, setGenre] = useState("");
  const [imageBuffer, setImageBuffer] = useState([]); // Image buffer data
  const [imageType, setImageType] = useState("");
  const [isMore, setIsMore] = useState("more"); // Whether "Read More" is required

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      axios.get("http://localhost:4000/view-book/" + props.match.params.id).then(res => {
        setBookName(res.data.name);
        setAuthor(res.data.author);
        setBookDes(res.data.description);
        setGenre(res.data.genre);
        setImageBuffer(res.data.image.data.data);
        setImageType(res.data.image.contentType);
      }).catch(error => {
        console.log(error);
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
    axios.delete("http://localhost:4000/delete-book/" + bookId).then(res => {
      console.log("Successfully deleted book");
      props.history.replace("/"); // Navigate back to Browse
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="bookinfo-wrapper">
      <Row>
        <Col className="bookinfo-image-wrapper">
          <img src={renderImage(imageBuffer, imageType)} alt={bookName}/>
          <div>
            <Tooltip title="Edit record" placement="bottom">
              <Link to={"/edit-book/" + props.match.params.id}>
                <EditIcon className="icon"/>
              </Link>
            </Tooltip>
            <Tooltip title="Delete record" placement="bottom">
              <DeleteIcon className="icon" onClick={() => deleteBook(props.match.params.id)}/>
            </Tooltip>
          </div>
        </Col>
        <Col>
          <h2 style={{display: "inline-block"}}>{bookName}</h2>
          <p>{author} | {genre}</p>
          {/* "Read More" if text longer than 530 */}
          <p className="book-des">{isMore === "more" ? bookDes.substring(0, 530) : bookDes}</p>
          {bookDes.length > 530 ? <button className="read-more" onClick={readMore}>Read {isMore}...</button> : null}
        </Col>
      </Row>
    </div>
  )
}

export default BookInfo;
