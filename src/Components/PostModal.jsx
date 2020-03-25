import React, { Component } from 'react';
import { Button, Fade, Row, Container, Col, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify'

class PostModal extends Component {
    state = {
        post: undefined,
        comments: [],
        commentLoading: true,
        comment: ""
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.open} toggle={this.props.toggle} >
                    <ModalHeader toggle={this.props.toggle}></ModalHeader>
                    <ModalBody>
                        <Container className="section-modal">
                            <Row>
                                <Col>
                                    <h4 className="mb-3">{this.props.post.title.toUpperCase()}</h4>
                                    <h5 className="mb-3">{this.props.post.description}</h5>
                                </Col>
                                <Col className="col-3">
                                    <Row>
                                        <h6 >{this.props.post.difficulty}</h6><br />
                                    </Row>
                                    <Row>
                                        <h6 >{this.props.post.category}</h6>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <img className="modal-image" src={this.props.post.image} />
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
                                        <img className="comment-pic" src={comment.userInfo[0].image} />
                                        <Col>
                                            <Row>
                                                <h5>{this.capFirst(comment.userInfo[0].firstname) + " " + this.capFirst(comment.userInfo[0].lastname)}</h5>
                                            </Row>
                                            <Row>
                                                <h6>{comment.comment}</h6>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Fade>
                            </Container>
                        )}
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    componentDidMount = async () => {
        try {
            let response = await fetch("http://localhost:9000/api/comments/" + this.props.post._id)
            let comments = await response.json()
            this.setState({
                post: this.props.post,
                comments: comments
            })
            console.log(this.state.comments)
            setTimeout(() => {
                this.setState({
                    commentLoading: false
                })
            }, 500);
        } catch (e) {
            console.log(e)
        }
    }

    postComment = async (e) => {
        e.preventDefault()
        if (localStorage.getItem("username")) {
            let comment = {
                username: localStorage.getItem("username"),
                comment: this.state.comment,
                postid: this.props.post._id
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

export default PostModal;