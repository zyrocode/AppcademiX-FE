import React, { Component } from 'react';
import { Button, Fade, Row, Container, Col, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';


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
                    <ModalHeader toggle={this.props.toggle}>{this.props.post.title.toUpperCase()}</ModalHeader>
                    <ModalBody>
                        <p>{this.props.post.description}</p>
                        {localStorage.getItem("username") &&
                            <Form onSubmit={this.postComment}>
                                <FormGroup>
                                    <Label>Comment the post:</Label>
                                    <Input type="text" onChange={(e) => this.setState({ comment: e.target.value })} value={this.state.comment} />
                                </FormGroup>
                                <Button className="btn-modal-primary">Comment</Button>
                            </Form>}
                        {this.state.comments && !this.state.commentLoading && this.state.comments.map((comment, index) =>
                            <Container key={index}>
                                <Fade>
                                    <Row>
                                        <img src={comment.user.image} />
                                        <Col>
                                            <Row>
                                                <h5>{this.capFirst(comment.user.firstname) + " " + this.capFirst(comment.user.lastname)}</h5>
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
            console.log("all comments", comments)
            comments.forEach(async (comment) => {
                let response = await fetch("http://localhost:9000/api/users/" + comment.username)
                let user = await response.json()
                if (response.ok)
                    comment.user = user
            })
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
            if (response.ok) {
                this.setState({
                    comments: [
                        ...this.state.comments,
                        comment
                    ],
                    comment: ""
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    capFirst = string => {
        if (string)
            return string.charAt(0).toUpperCase() + string.slice(1)
    }
}

export default PostModal;