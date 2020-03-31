import React, { Component } from 'react';
import { Button, Fade, Row, Container, Col, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify'
import Moment from "react-moment"
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import ReactPlayer from 'react-player'

const mapStateToProps = state => state

class PostModal extends Component {
    state = {
        comments: [],
        commentLoading: true,
        comment: "",
        openForEdit: false,
        commentForEdit: "",
        commentForEditID: "",
        commentForEditPostID: ""
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.open} toggle={this.props.toggle} >
                    <ModalHeader toggle={this.props.toggle}></ModalHeader>
                    <ModalBody>
                        <Container className="section-modal">
                            <Row>
                                <img className="modal-image" src={this.props.post.image} />
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
                            <ReactPlayer url={this.props.post.link} playing />
                            </Row>
                        </Container>
                        <Container className="section-modal">
                            <Form onSubmit={this.postComment}>
                                <Col></Col>
                                <FormGroup>
                                    <img className="comment-pic" src={this.props.userInfo.image} className=" mr-3 p-2 " style={{ maxHeight: "40px", maxWidth: "40px" }} />
                                    <Label className="font-weight-bold">{this.capFirst(this.props.userInfo.firstname) + " " + this.capFirst(this.props.userInfo.lastname)}</Label>
                                    <Input type="text" onChange={(e) => this.setState({ comment: e.target.value })} value={this.state.comment} placeholder="Comment this post" />
                                </FormGroup>
                                <Button className="btn-modal-primary">Comment</Button>
                            </Form>
                        </Container>
                        {this.state.comments && !this.state.commentLoading && this.state.comments.map((comment, index) =>
                            <Container className="section-modal" key={index}>
                                {this.props.userInfo.username === comment.userInfo.username && !this.state.openForEdit && <div className="penBg float-right" onClick={() => this.setState({ openForEdit: true, commentForEdit: comment.comment, commentForEditID: comment._id, commentForEditPostID: comment.postid })}><FontAwesome name="pen" className=" penEdit" /></div>
                                }
                                <Fade>
                                    <Row>
                                        <img className="comment-pic" src={comment.userInfo.image} />
                                        {this.state.commentForEditID !== comment._id &&
                                            <Col>
                                                <Row>
                                                    <h5 className="font-weight-bold">{this.capFirst(comment.userInfo.firstname) + " " + this.capFirst(comment.userInfo.lastname)}</h5>
                                                </Row>
                                                <Row>
                                                    <h6 className="mt-3 mb-3">{comment.comment}</h6>
                                                </Row>
                                                <Row>
                                                    <h6 style={{ color: "rgba(32, 32, 32, 0.397)", fontStyle: "italic", fontSize: "small" }}><Moment fromNow>{comment.createdAt}</Moment></h6>
                                                </Row>
                                            </Col>}
                                        {this.state.openForEdit && this.state.commentForEditID === comment._id && <Col>
                                            <button type="button" className="close" aria-label="Close" onClick={() => this.setState({ openForEdit: false, commentForEditID: "", commentForEditPostID: "" })}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                            <FormGroup >
                                                <Label>Edit this comment:</Label>
                                                <Input type="textarea" onChange={(e) => this.setState({ commentForEdit: e.target.value })} value={this.state.commentForEdit} />
                                            </FormGroup>
                                            <Row>
                                                <Button className="btn-modal-success ml-3" onClick={this.updateComment}>Update</Button>
                                                <Col>
                                                    <Button className="btn-modal-danger" onClick={this.deleteComment}>Delete</Button>
                                                </Col>
                                            </Row>
                                        </Col>}
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
        await this.getAllComments()
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevState.openForEdit !== this.state.openForEdit) {
            await this.getAllComments()
            // this.props.refresh()
        }
    }


    getAllComments = async () => {
        try {
            let response = await fetch(`http://localhost:9000/api/comments/${this.props.post._id}?sort=updatedAt`)
            let comments = await response.json()
            //    let sortedComments = comments.sort((a,b) =>b.createdAt - a.createdAt)


            this.setState({
                post: this.props.post,
                comments: comments.reverse()
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

    updateComment = async () => {
        //    /api/comments/:postid/:username/:commentid
        // commentForEdit:"",
        // commentForEditID:"",
        //commentForEditPostID:""
        try {


            const { commentForEdit, commentForEditID, commentForEditPostID } = this.state

            let bodyForPUT = { comment: commentForEdit }

            let response = await fetch(`http://localhost:9000/api/comments/${commentForEditPostID}/${this.props.userInfo.username}/${commentForEditID}`, {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + this.props.accessToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyForPUT)
            })

            if (response.ok) {
                this.setState({
                    commentForEdit: "",
                    commentForEditID: "",
                    commentForEditPostID: "",
                    openForEdit: false
                })

            }

        } catch (error) {
            console.log(error)

        }



    };

    deleteComment = async () => {
        // api/comments/:commentid/posts/:postid?username=:username

        try {
            const { commentForEditID, commentForEditPostID } = this.state

            let response = await fetch(`http://localhost:9000/api/comments/${commentForEditID}/posts/${commentForEditPostID}?username=${this.props.userInfo.username}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + this.props.accessToken,
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                this.setState({
                    commentForEdit: "",
                    commentForEditID: "",
                    commentForEditPostID: "",
                    openForEdit: false
                })

            }

        } catch (error) {
            console.log(error)

        }


    };


    postComment = async (e) => {
        e.preventDefault()
        if (localStorage.getItem("username")) {
            let comment = {
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
                            comment.newComment, ...this.state.comments,

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

export default withRouter(connect(mapStateToProps)(PostModal));