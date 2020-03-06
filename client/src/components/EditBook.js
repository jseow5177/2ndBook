import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

function EditBook(props) {

  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [bookDes, setBookDes] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState({});

  // GET the book
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      axios.get("http://localhost:4000/edit-book/" + props.match.params.id).then(res => {
        setBookName(res.data.name);
        setAuthor(res.data.author);
        setBookDes(res.data.description);
        setGenre(res.data.genre);
        setImage({
          preview: res.data.preview
        });
      }).catch(error => {
        console.log(error);
      });
    }

    return () => isSubscribed = false;

  }, [props.match.params.id]);

  const uploadImage = (event) => {
    if (event.target.files.length === 0) { // When image upload is cancelled
      setImage({});
    } else {
      setImage({
        preview: URL.createObjectURL(event.target.files[0]), // Link for image preview
        file: event.target.files[0] // File for upload
      })
      console.log(event.target.files[0]);
    }
  }

  const changeBookName = (event) => {
    setBookName(event.target.value);
  }

  const changeAuthor = (event) => {
    setAuthor(event.target.value);
  }

  const changeBookDes = (event) => {
    setBookDes(event.target.value);
  }

  const genreSelect = (event) => {
    setGenre(event.target.value);
  }

  const submitForm = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", bookName); // Append the values with key value pairs
    formData.append("author", author);
    formData.append("description", bookDes);
    formData.append("genre", genre);
    formData.append("image", image.file);
    formData.append("preview", image.preview);

    const config = {
      headers: {"content-type": "multipart/form-data"} // Specify that you are sending form data
    }

    axios.put("http://localhost:4000/edit-book/" + props.match.params.id, formData, config).then(response => {
      console.log(response.data)
    }).catch(error => {
        console.log(error)
      });

    setBookName("");
    setAuthor("");
    setBookDes("");
    setGenre("");
    setImage({});
  };

  return (
    <div className="form-wrapper">
      <div className="preview-image-wrapper">
        <img src={image.preview ? image.preview : "https://mweb-cdn.karousell.com/build/select-photo-a2ee9a0f15cf6a64ff3119c599e31a8d.svg"} alt="book-preview"/>
      </div>

      <Form onSubmit={submitForm}>

        <Form.Row>
          <Form.Group className="form-input" as={Col} controlId="book-name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={bookName} placeholder="An Awesome Book!" onChange={changeBookName} required/>
          </Form.Group>

          <Form.Group className="form-input" as={Col} controlId="book-author">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" value={author} placeholder="John Doe" onChange={changeAuthor} required/>
          </Form.Group>
        </Form.Row>

        <Form.Group className="form-input" controlId="book-summary">
          <Form.Label>Description</Form.Label>
          <Form.Control style={{resize: "none"}} as="textarea" rows="5" value={bookDes} placeholder="This is a book about awesome books!" onChange={changeBookDes} required/>
        </Form.Group>

        <Form.Row>

          <Form.Group className="form-input" as={Col} controlId="book-genre">
            <Form.Label>Genre</Form.Label>
            <Form.Control as="select" value={genre} onChange={genreSelect} required>
              <option>Choose...</option>
              <option>Fiction</option>
              <option>Action</option>
              <option>Thriller</option>
              <option>Business</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="form-input" as={Col} controlId="book-image">
            <Form.Label>Photo</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={uploadImage} encType="multipart/form-data"  />
          </Form.Group>

        </Form.Row>

        <div className="submit-form-btn-wrapper">
          <Button className="submit-form-btn" variant="primary" size="lg" type="submit">Save Changes</Button>
        </div>

      </Form>
    </div>
  )
}

export default EditBook;
