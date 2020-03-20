import React, { Component } from 'react';
import { Button, Col, Row, Fade, Container, Form, FormGroup, Label, Input } from 'reactstrap';

class CreatePost extends Component {
    state = {
        title: "",
        description: "",
        link: "",
        difficulty: "",
        category: ""
    }

    render() {
        return (
            <Fade>
                <Container className="m-5">
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
                                    <Input type="select" onChange={(e) => this.setState({ category: e.target.value })} value={this.state.category} required>
                                        <option>Easy</option>
                                        <option>Medium</option>
                                        <option>Hard</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Category</Label>
                                    <Input type="select" onChange={(e) => this.setState({ category: e.target.value })} value={this.state.category} required>
                                        <option>Tech</option>
                                        <option>Sales</option>
                                        <option>Productivity</option>
                                        <option>Other</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Image</Label>
                                    <Input type="file"></Input>
                                </FormGroup>
                                <Button>Create Post</Button>
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
            console.log(response)
            if (response.ok){
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