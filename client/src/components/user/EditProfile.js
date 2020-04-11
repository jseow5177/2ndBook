import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {renderImage, userImagePlaceholder} from "../../helper/image.js";


function EditProfile(props) {

    let history = useHistory();

    const [userInfo, setUserInfo] = useState({
        username: "",
        bio: "",
        imageBuffer: [],
        imageType: ""
    });

    const [image, setImage] = useState({});
    const [somethingChanged, setSomethingChanged] = useState(false); 

    useEffect(() => {
        axios.get(`http://localhost:4000/users/edit/${props.auth.user.id}`).then(res => {
            setUserInfo({
                username: res.data.username,
                bio: res.data.bio,
                imageBuffer: res.data.image.data,
                imageType: res.data.image.contentType
            });
        }).catch(error => {
            console.log(error.response.data)
        });

    }, [props.auth.user.id])

    const handleChange = (event) => {
        setSomethingChanged(true);
        setUserInfo({...userInfo, [event.target.id]: event.target.value});
    }

    const uploadImage = (event) => {
        if (event.target.files.length !== 0) {
            setSomethingChanged(true);
            setImage({
                preview: URL.createObjectURL(event.target.files[0]), // Link for image preview
                file: event.target.files[0] // File to upload to db
              });
            }
        }

    const submitUserProfileForm = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("username", userInfo.username);
        formData.append("bio", userInfo.bio);
        formData.append("image", image.file);

        axios.put(`http://localhost:4000/users/edit/${props.auth.user.id}`, formData).then(res => {
            console.log(res.data);
            history.push(`${props.auth.user.id}`);
        }).catch(error => {
            console.log(error.response.data);
        });

    }

    return (
        <div>
            <Form onSubmit={submitUserProfileForm} className="user-profile-form">
                <Row>
                    <Col className="profile-img-wrapper" md={4} xs={12}>
                        <Image 
                            className="profile-image" 
                            roundedCircle 
                            src={image.preview ? 
                                image.preview : (userInfo.imageType ? renderImage(userInfo.imageBuffer.data, userInfo.imageType) : userImagePlaceholder)}/>
                        <div className="upload-btn-wrapper">
                            <Button variant="link">Upload a photo</Button>
                            <input type="file" accept="image/*" onChange={uploadImage} name="profile-img" title=""/>
                        </div>
                    </Col>
                    <Col className="user-profile-body" md={8} xs={12}>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" className="user-profile-field"><h6>Name</h6></Form.Label>
                            <Col sm="10">
                                <Form.Control id="username" className="user-profile-input" value={userInfo.username} onChange={handleChange}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2" className="user-profile-field"><h6>Bio</h6></Form.Label>
                            <Col sm="10">
                                <Form.Control 
                                    id="bio" 
                                    className="user-profile-input" 
                                    as="textarea" 
                                    placeholder="About you" 
                                    value={userInfo.bio}
                                    maxLength="151"
                                    onChange={handleChange}/>
                                <div className="max-length-tooltip">{userInfo.bio.length > 150 ? "Cannot exceed 150 characters" : null}</div>
                            </Col>
                        </Form.Group>

                        <Button 
                            className="profile-submit-btn" 
                            disabled={somethingChanged ? null : "True"}
                            type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
});


export default connect(mapStateToProps, null)(EditProfile);