import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function BookCard(props) {

  const renderImage = (imageFile) => {

    const contentType = imageFile.contentType;
    const arrayBuffer = imageFile.data.data;

    const binary = Buffer.from(arrayBuffer).toString('base64'); // Convert Buffer data to Binary

    const base64Flag = `data:${contentType};base64,`; // Set to the right format: data:[data-type];base64,[binary]

    return base64Flag + binary
  }

  return (
    <div>
      <Col md="4">
        <Link to={"/view-book/" + props.id} style={{color: "inherit", textDecoration: "none"}}>
          <Card>
            <Card.Img src={renderImage(props.image)} alt="book-image" />
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
