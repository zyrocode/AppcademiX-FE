import React, { Component } from 'react';
import { Button, Col, Row, Fade, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import NavBar from './Navbar';

class CreatePost extends Component {
    state = {
        title: "",
        description: "",
        link: "",
        difficulty: "",
        category: "",
        selectedFile: null
    }

    render() {
        return (
            <Fade>
                <NavBar />
                <Container className="create-post">
                    <Row>
                        <Col>
                            <Form onSubmit={this.submitPost}>
                                <FormGroup>
                                    <Label>Title</Label>
                                    <Input type="text" onChange={(e) => this.setState({ title: e.target.value })} value={this.state.title} required></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Description</Label>
                                    <Input type="text" onChange={(e) => this.setState({ description: e.target.value })} value={this.state.description} required></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Link</Label>
                                    <Input type="url" onChange={(e) => this.setState({ link: e.target.value })} value={this.state.link} required></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Difficulty</Label>
                                    <Input type="select" onChange={(e) => this.setState({ difficulty: e.target.value })} value={this.state.difficulty} required>
                                        <option>-</option>
                                        <option>Easy</option>
                                        <option>Medium</option>
                                        <option>Hard</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Category</Label>
                                    <Input type="select" onChange={(e) => this.setState({ category: e.target.value })} value={this.state.category} required>
                                        <option>-</option>
                                        <option>Tech</option>
                                        <option>Sales</option>
                                        <option>Productivity</option>
                                        <option>Other</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="btn btn-primary">Upload Image
                                        <Input type="file" onChange={(val) => this.setState({ selectedFile: val.target.files[0] })} ></Input>
                                    </Label>
                                    {this.state.selectedFile && this.state.selectedFile.name}
                                </FormGroup>
                                <Button className="btn-modal-primary">Create Post</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Fade>
        );
    }

    submitPost = async (e) => {
        e.preventDefault()
        let post = {
            title: this.state.title,
            description: this.state.description,
            link: this.state.link,
            difficulty: this.state.difficulty,
            category: this.state.category
        }
        try {
            let response = await fetch("http://localhost:9000/api/posts/" + localStorage.getItem("username"), {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access_token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            })
            if (this.state.selectedFile) {
                let post = await response.json()
                console.log(post)
                let id = post.newPost._id
                let fd = new FormData();
                fd.append("postImage", this.state.selectedFile)
                let fileUploaded = await fetch("http://localhost:9000/api/posts/image/" + id + "/" + localStorage.getItem("username"), {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("access_token")
                    },
                    body: fd
                })
            }
            if (response.ok) {
                this.props.history.push("/")
            }
            else
                console.log("Error")
        } catch (e) {
            console.log(e)
        }
    }
}

export default CreatePost;