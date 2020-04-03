import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { renderImage } from "../../helper";
import { useHistory } from 'react-router-dom';

function EditBook(props) {

  const history = useHistory();

  const [oldBook, setOldBook] = useState({
    bookName: "",
    author: "",
    bookDes: "",
    genre: "",
    image: {
      buffer: [],
      type: ""
    }
  });

  const [image, setImage] = useState({});
  const [isNewImage, setIsNewImage] = useState(false);

  // GET the old book
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      axios.get("http://localhost:4000/edit-book/" + props.match.params.id).then(res => {
        setOldBook({
          bookName: res.data.name,
          author: res.data.author,
          bookDes: res.data.description,
          genre: res.data.genre,
          image: {
            buffer: res.data.image.data.data,
            type: res.data.image.contentType
          }
        })
      }).catch(error => {
        console.log(error.response.data);
      });
    }

    return () => isSubscribed = false;

  }, [props.match.params.id]);

  const onBookInputChange = (event) => {
    setOldBook({...oldBook, [event.target.id]: event.target.value});
  }

  const uploadImage = (event) => {
    if (event.target.files.length !== 0) {
      setImage({
        preview: URL.createObjectURL(event.target.files[0]), // Link for image preview
        file: event.target.files[0] // File for upload
      })
      setIsNewImage(true);
    }
  }

  const submitForm = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", oldBook.bookName);
    formData.append("author", oldBook.author);
    formData.append("description", oldBook.bookDes);
    formData.append("genre", oldBook.genre);
    formData.append("image", image.file);

    axios.put("http://localhost:4000/edit-book/" + props.match.params.id, formData).then(response => {
      console.log(response.data)
    }).catch(error => {
        console.log(error)
      });

    history.goBack();
  };

  return (
    <div className="form-wrapper">
      <div className="preview-image-wrapper">
        {/* Preview new image or render the Buffer data of old image */}
        <img src={isNewImage ? image.preview : renderImage(oldBook.image.buffer, oldBook.image.type)} alt="book-preview"/>
      </div>

      <Form onSubmit={submitForm}>

        <Form.Row>
          <Form.Group className="form-input" as={Col}>
            <Form.Label>Name</Form.Label>
            <Form.Control id="bookName" type="text" value={oldBook.bookName} placeholder="An Awesome Book!" onChange={onBookInputChange} required/>
          </Form.Group>

          <Form.Group className="form-input" as={Col}>
            <Form.Label>Author</Form.Label>
            <Form.Control id="author" type="text" value={oldBook.author} placeholder="John Doe" onChange={onBookInputChange} required/>
          </Form.Group>
        </Form.Row>

        <Form.Group className="form-input">
          <Form.Label>Description</Form.Label>
          <Form.Control id="bookDes" style={{resize: "none"}} as="textarea" rows="5" value={oldBook.bookDes} placeholder="This is a book about awesome books!" onChange={onBookInputChange} required/>
        </Form.Group>

        <Form.Row>

          <Form.Group className="form-input" as={Col}>
            <Form.Label>Genre</Form.Label>
            <Form.Control id="genre" as="select" value={oldBook.genre} onChange={onBookInputChange} required>
              <option>Choose...</option>
              <option>Fiction</option>
              <option>Non-Fiction</option>
              <option>Thriller</option>
              <option>Business</option>
              <option>Science</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="form-input" as={Col}>
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
