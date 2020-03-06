import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import axios from "axios";

import { Link } from "react-router-dom";

function BookInfo(props) {

  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [bookDes, setBookDes] = useState("");
  const [genre, setGenre] = useState("");
  const [imageBuffer, setImageBuffer] = useState([]);
  const [imageType, setImageType] = useState("");
  const [isMore, setIsMore] = useState("more");

  const renderImage = (buffer, type) => {

    const binary = Buffer.from(buffer).toString('base64'); // Convert Buffer data to Binary

    const base64Flag = `data:${type};base64,`; // Set to the right format: data:[data-type];base64,[binary]

    return base64Flag + binary
  }

  useEffect(() => {

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
      props.history.replace("/");
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="bookinfo-wrapper">
      <Row>
        <Col className="bookinfo-image-wrapper">
          <img src={renderImage(imageBuffer, imageType)} alt={bookName}/>
        </Col>
        <Col>
          <h2 style={{display: "inline-block"}}>{bookName}</h2>
          <Tooltip title="Edit book" placement="top">
            <Link to={"/edit-book/" + props.match.params.id}>
              <EditIcon className="icon"/>
            </Link>
          </Tooltip>
          <Tooltip title="Delete book" placement="top">
            <DeleteIcon className="icon" onClick={() => deleteBook(props.match.params.id)}/>
          </Tooltip>
          <p>{author} | {genre}</p>
          <p>{isMore === "more" ? bookDes.substring(0, 530) : bookDes}</p>
          {bookDes.length > 530 ? <button className="read-more" onClick={readMore}>Read {isMore}...</button> : null}
        </Col>
      </Row>
    </div>
  )
}

export default BookInfo;
