import React from "react";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {renderImage, userImagePlaceholder} from "../../helper/image.js";

function ProfileSection({userInfo, bookNum, auth}) {
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
                    <p className="profile-stats"><b>{bookNum}</b> {bookNum > 1 ? "books" : "book"}</p>
                    <p className="profile-stats">{userInfo.bio}</p>
                    {
                        userInfo.userId === auth.user.id
                        ? <Link to={"/users/profile/edit"}><Button variant="dark" size="sm">Edit profile</Button></Link>
                        : null
                    }
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