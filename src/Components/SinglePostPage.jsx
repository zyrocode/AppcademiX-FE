import React, { Component } from 'react';
import { Fade, Container, Col, Row, Label, Input, Form, FormGroup, Button } from 'reactstrap'
import { toast } from 'react-toastify'

class SinglePostPage extends Component {
    state = {
        post: undefined,
        comments: []
    }
    render() {
        return (
            <Fade>
                {this.state.post &&
                    <>
                        <Container className="section-modal">
                            <Row>
                                <Col>
                                    <h4 className="mb-3">{this.state.post.title.toUpperCase()}</h4>
                                    <h5 className="mb-3">{this.state.post.description}</h5>
                                </Col>
                                <Col className="col-3">
                                    <Row>
                                        <h6 >{this.state.post.difficulty}</h6><br />
                                    </Row>
                                    <Row>
                                        <h6 >{this.state.post.category}</h6>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <img className="modal-image" src={this.state.post.image} />
                                </Col>
                            </Row>
                        </Container>
                        <Container className="section-modal">
                            <Form onSubmit={this.postComment}>
                                <FormGroup>
                                    <Label>Comment the post:</Label>
                                    <Input type="text" onChange={(e) => this.setState({ comment: e.target.value })} value={this.state.comment} />
                                </FormGroup>
                                <Button className="btn-modal-primary">Comment</Button>
                            </Form>
                        </Container>
                        {this.state.comments && !this.state.commentLoading && this.state.comments.map((comment, index) =>
                            <Container className="section-modal" key={index}>
                                <Fade>
                                    <Row>
                                        <img className="comment-pic" src={comment.userInfo.image} />
                                        <Col>
                                            <Row>
                                                <h5>{this.capFirst(comment.userInfo.firstname) + " " + this.capFirst(comment.userInfo.lastname)}</h5>
                                            </Row>
                                            <Row>
                                                <h6>{comment.comment}</h6>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Fade>
                            </Container>
                        )}
                    </>}
            </Fade>
        );
    }

    componentDidMount = async () => {
        try {
            let response = await fetch("http://localhost:9000/api/posts/" + this.props.match.params.id)
            let post = await response.json()
            response = await fetch("http://localhost:9000/api/comments/" + this.props.match.params.id)
            let comments = await response.json()
            if (response.ok)
                this.setState({
                    post: post,
                    comments: comments
                })
        } catch (e) {
            console.log(e)
        }
    }

    postComment = async (e) => {
        e.preventDefault()
        if (localStorage.getItem("username")) {
            let comment = {
                comment: this.state.comment,
                postid: this.state.post._id
            }
            try {
                let response = await fetch("http://localhost:9000/api/comments/" + this.props.post._id + "/" + localStorage.getItem("username"), {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("access_token"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(comment)
                })
                comment = await response.json()
                if (response.ok) {
                    this.setState({
                        comments: [
                            ...this.state.comments,
                            comment.newComment
                        ],
                        comment: ""
                    })
                    console.log(comment)
                }
            } catch (e) {
                console.log(e)
            }
        } else {
            toast.error("Login to comment the post!")
        }
    }

    capFirst = string => {
        if (string)
            return string.charAt(0).toUpperCase() + string.slice(1)
    }
}

export default SinglePostPage;