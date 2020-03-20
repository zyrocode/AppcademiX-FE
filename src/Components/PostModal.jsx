import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';


class PostModal extends Component {
    state = {
        post: undefined,
        comments: [],
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
                        {this.state.comments && this.state.comments.map((comment, index) => <p key={index}> {comment.comment} </p>)}
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    componentDidMount = async () => {
        try {
            let response = await fetch("http://localhost:9000/api/comments/" + this.props.post._id)
            let comments = await response.json()
            console.log(comments)
            this.setState({
                post: this.props.post,
                comments: comments
            })
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
            if(response.ok) {
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
}

export default PostModal;