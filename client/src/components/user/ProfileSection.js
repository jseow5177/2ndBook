import React, {useState, useEffect} from "react";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {renderImage, userImagePlaceholder} from "../../helper/image.js";

function ProfileSection(props) {

    const [userInfo, setUserInfo] = useState({
        username: "",
        bio: "",
        imageBuffer: [],
        imageType: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:4000/users/profile/${props.auth.user.id}`).then(res => {
            setUserInfo({
                username: res.data.username,
                bio: res.data.bio,
                imageBuffer: res.data.image.data,
                imageType: res.data.image.contentType
            });
        });
    }, [props.auth.user.id]);

    return(
        <div className="profile-section">
            <Row>
                <Col className="profile-img-wrapper" xs={12} md={4}>
                    <Image 
                        src={userInfo.imageType ? renderImage(userInfo.imageBuffer.data, userInfo.imageType) : userImagePlaceholder} 
                        roundedCircle
                        className="profile-image"/>
                </Col>
                <Col xs={12} md={8}>
                    <h2 className="profile-name">{userInfo.username}</h2>
                    <p className="profile-stats"><b>{props.bookNum}</b> {props.bookNum > 1 ? "books" : "book"}</p>
                    <p className="profile-stats">{userInfo.bio}</p>
                    <Link to={"/users/profile/edit"}><Button className="edit-profile-btn" variant="light" size="sm">Edit profile</Button></Link>
                </Col>
            </Row>
            
            <hr className="section-line"/>
        </div>
        
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(ProfileSection);