import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

function BookCard(props) {

  const renderImage = (imageFile) => {

    const contentType = imageFile.contentType;
    const arrayBuffer = imageFile.data.data;

    let binary = btoa(String.fromCharCode.apply(null, arrayBuffer));

    const base64Flag = `data:${contentType};base64,`;

    console.log(binary);

    return base64Flag + binary
  }

  return (
    <div>
      <Col md={4}>
        <Card>
          <img variant="top" src={renderImage(props.image)} />
        </Card>
      </Col>
      <p>{props.name}</p>
    </div>
  )
}

export default BookCard;
