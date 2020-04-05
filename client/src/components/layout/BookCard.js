/* Display books with card design */

import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import {renderImage} from "../../helper/image.js";

function BookCard(props) {

  return (
    <div>
      <Col md="4">
        <Link to={"/books/" + props.id} style={{color: "inherit", textDecoration: "none"}}>
          <Card>
            <Card.Img src={renderImage(props.image.data.data, props.image.contentType)} alt="book-image" />
            <Card.Body>
              <Card.Title>{props.name}</Card.Title>
              <Card.Subtitle>By {props.author}</Card.Subtitle>
              <Card.Text>{props.genre}</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </div>
  )
}

export default BookCard;
