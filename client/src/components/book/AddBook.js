import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {imagePlaceholder} from "../../helper/image.js";

function AddBook(props) {
  const history = useHistory();

  const [newBook, setNewBook] = useState({
    bookName: "",
    author: "",
    bookDes: "",
    genre: "",
  });

  const [image, setImage] = useState({}); // To hold new image

  const onBookInputChange = (event) => {
    setNewBook({...newBook, [event.target.id]: event.target.value});
  }

  const uploadImage = (event) => {
    if (event.target.files.length !== 0) {
      setImage({
        preview: URL.createObjectURL(event.target.files[0]), // Link for image preview
        file: event.target.files[0] // File to upload to db
      });
    }
  }

  const submitAddBookForm = (event) => {
    event.preventDefault();

    // When a web client uploads a file to a server, it is generally submitted through a form and encoded as multipart/form-data.
    const formData = new FormData();
    formData.append("name", newBook.bookName); // Append the values with key value pairs
    formData.append("author", newBook.author);
    formData.append("description", newBook.bookDes);
    formData.append("genre", newBook.genre);
    formData.append("image", image.file);

    axios.post("http://localhost:4000/books/add", formData).then(res => {
      history.replace(`/users/${props.auth.id}`);
    }).catch(error => {
        console.log(error.response.data);
      });

  };

  return (
    <div className="form-wrapper">
      <div className="preview-image-wrapper">
        <img src={image.preview ? image.preview : imagePlaceholder} alt="book-preview"/>
      </div>

      <Form onSubmit={submitAddBookForm}>

        <Form.Row>
          <Form.Group className="form-input" as={Col}>
            <Form.Label>Name</Form.Label>
            <Form.Control id="bookName" type="text" value={newBook.bookName} placeholder="An Awesome Book!" onChange={onBookInputChange} required/>
          </Form.Group>

          <Form.Group className="form-input" as={Col}>
            <Form.Label>Author</Form.Label>
            <Form.Control id="author" type="text" value={newBook.author} placeholder="John Doe" onChange={onBookInputChange} required/>
          </Form.Group>
        </Form.Row>

        <Form.Group className="form-input">
          <Form.Label>Description</Form.Label>
          <Form.Control id="bookDes" style={{resize: "none"}} as="textarea" rows="5" value={newBook.bookDes} placeholder="This is a book about awesome books!" onChange={onBookInputChange} required/>
        </Form.Group>

        <Form.Row>

          <Form.Group className="form-input" as={Col}>
            <Form.Label>Genre</Form.Label>
            <Form.Control id="genre" as="select" value={newBook.genre} onChange={onBookInputChange} required>
              <option>Choose...</option>
              <option>Fiction</option>
              <option>Non-Fiction</option>
              <option>Thriller</option>
              <option>Business</option>
              <option>Science</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="form-input" as={Col} controlId="book-image">
            <Form.Label>Photo</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={uploadImage} encType="multipart/form-data" required/>
          </Form.Group>

        </Form.Row>

        <div className="submit-form-btn-wrapper">
          <Button className="submit-form-btn" variant="primary" size="lg" type="submit">Upload Book</Button>
        </div>

      </Form>
    </div>
  )
}

const mapStateToPros = state => ({
  auth: state.auth
});

export default connect(mapStateToPros, null)(AddBook);
