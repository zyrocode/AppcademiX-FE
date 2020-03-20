import React, { Component } from 'react';
import { Container, Col, Fade, Row } from 'reactstrap'
import RatingsPage from './RatingsPage';
// import FontAwesome from 'react-fontawesome'

class PostsList extends Component {
    state = {
        posts: []
    }
    render() {
        return (
            <Fade>
                {this.props.posts && this.props.posts.map((post, index) =>
                    <Container className="m-4 mx-auto post" key={index}>
                        <Row>
                            <div className="m-2">
                                <img className="post-image" src={post.image} alt="Post Default Pic" />
                            </div>
                            <Col>
                                <Row><h4>{post.title}</h4></Row>
                                <Row>{post.description}</Row>
                            </Col>
                            <RatingsPage id={post._id} refresh={this.props.nrefresh}/>
                        </Row>
                    </Container>
                )}
            </Fade>
        );
    }


}

export default PostsList;