import React, { Component } from 'react';
import { Button, Col, Row, Fade, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import NavBar from './NavBar';

class Register extends Component {
    state = {
        firstname: "",
        lastname: "",
        username: "",
        password:"",
        email: ""
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
                                    <Label>Firstname</Label>
                                    <Input type="text" onChange={(e) => this.setState({ firstname: e.target.value })} value={this.state.firstname} required></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Lastname</Label>
                                    <Input type="text" onChange={(e) => this.setState({ lastname: e.target.value })} value={this.state.lastname} required></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Username</Label>
                                    <Input type="text" onChange={(e) => this.setState({ username: e.target.value })} value={this.state.username} required></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input type="password" onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} required></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>E-Mail</Label>
                                    <Input type="email" onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} required/>
                                </FormGroup>
                                <Button className="btn-modal-primary">Register</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Fade>
        );
    }

    submitPost = async (e) => {
        e.preventDefault()
        let user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }
        try {
            let response = await fetch("http://localhost:9000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            let credentials = await response.json()
            if (response.ok) {
                localStorage.setItem("access_token", credentials.access_token)
                localStorage.setItem("username", credentials.username)
                this.props.history.push("/")
            }
            else
                console.log("Error")
        } catch (e) {
            console.log(e)
        }
    }
}

export default Register;