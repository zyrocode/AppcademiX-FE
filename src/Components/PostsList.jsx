import React, { Component } from 'react';
import { Container, Col, Fade, Row } from 'reactstrap'
import FontAwesome from 'react-fontawesome'

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
                                <img className="post-image" src={post.image} alt="Post Image" />
                            </div>
                            <Col>
                                <Row><h4>{post.title}</h4></Row>
                                <Row>{post.description}</Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <span onClick={() => this.ratePost(post._id)} className="rate">
                                            <FontAwesome
                                                name="star"
                                                size="2x"
                                            />
                                            <span className="rate-number">{post.ratings.length}</span>
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                )}
            </Fade>
        );
    }

    ratePost = async (id) => {
        console.log(id)
        if (localStorage.getItem("access_token")) {
            let response = await fetch("http://localhost:9000/api/ratings/" + id + "/" + localStorage.getItem("username"), {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access_token"),
                    "Content-Type": "application/json"
                }
            })
            console.log(await response.json())
            /* if(response.ok)
                this */
        }
    }
}

export default PostsList;