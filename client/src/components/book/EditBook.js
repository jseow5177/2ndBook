import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { renderImage } from "../../helper";
import { useHistory } from 'react-router-dom';

function EditBook(props) {

  const history = useHistory();
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [bookDes, setBookDes] = useState("");
  const [genre, setGenre] = useState("");
  const [imageBuffer, setImageBuffer] = useState([]);
  const [imageType, setImageType] = useState("");
  const [image, setImage] = useState({});
  const [isNewImage, setIsNewImage] = useState(false);

  // GET the book
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      axios.get("http://localhost:4000/edit-book/" + props.match.params.id).then(res => {
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

  const uploadImage = (event) => {
    if (event.target.files.length === 0) { // When image upload is cancelled
      setImage({});
    } else {
      setImage({
        preview: URL.createObjectURL(event.target.files[0]), // Link for image preview
        file: event.target.files[0] // File for upload
      })
      setIsNewImage(true);
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

    const config = {
      headers: {"content-type": "multipart/form-data"} // Specify that you are sending form data
    }

    axios.patch("http://localhost:4000/edit-book/" + props.match.params.id, formData, config).then(response => {
      console.log(response.data)
    }).catch(error => {
        console.log(error)
      });

    setBookName("");
    setAuthor("");
    setBookDes("");
    setGenre("");
    setImage({});

    history.goBack();
  };

  return (
    <div className="form-wrapper">
      <div className="preview-image-wrapper">
        {/* Preview new image or render the Buffer data of old image */}
        <img src={isNewImage ? image.preview : renderImage(imageBuffer, imageType)} alt="book-preview"/>
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
              <option>Non-Fiction</option>
              <option>Thriller</option>
              <option>Business</option>
              <option>Science</option>
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
