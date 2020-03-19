import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';


class Login extends Component {
    state = {
        username: "",
        password: ""
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.props.open} toggle={this.props.toggle} >
                    <ModalHeader toggle={this.props.toggle}>Appcademix</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.submitForm}>
                            <FormGroup>
                                <Label>Username</Label>
                                <Input type="text" onChange={(e) => this.setState({username: e.target.value})} value={this.state.username}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="password" onChange={(e) => this.setState({password: e.target.value})} value={this.state.password}/>
                            </FormGroup>
                            <Button style={{ backgroundColor: "#EF3C59", border: "1px solid #EF3C59" }}>Login</Button>{' '}
                            <Button style={{ float: "right" }} color="secondary" onClick={this.props.toggle}>Cancel</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    submitForm = async (loginCredentials) => {
        loginCredentials.preventDefault()
        let login = {
            username: this.state.username,
            password: this.state.password
        }
        try {
            let response = await fetch("http://localhost:9000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(login)
            })
            if (response.ok){
                let token = await response.json()
                localStorage.setItem("access_token", token.access_token)
                localStorage.setItem("username", token.username)
            }
            else    
                console.log("Incorrect login")
        } catch (e) {
            console.log(e)
        }

        this.props.toggle()
    }
}

export default Login;