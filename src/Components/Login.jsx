import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import  { connect } from "react-redux"


 import { getUsersWithThunk } from '../Actions/setUser' 

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    loadUsers: (userInfos) => dispatch(getUsersWithThunk(userInfos))
}) 


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
                                <Input type="text" onChange={(e) => this.setState({ username: e.target.value })} value={this.state.username} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="password" onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} />
                            </FormGroup>
                            <FormGroup>
                                <Link to="/register" onClick={() => this.props.toggle()}>New user? Click here to register</Link>
                            </FormGroup>
                            <Button className="btn-modal-primary">Login</Button>
                            <Button className="btn-modal-secondary" color="secondary" onClick={this.props.toggle}>Cancel</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    submitForm = async (e) => {
        e.preventDefault()
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
            
            if (response.ok) {
                let token = await response.json()
                console.log(token)
                this.props.loadUsers(token)
                localStorage.setItem("access_token", token.access_token)
                localStorage.setItem("username", token.userInfo.username)
                toast.success(`Welcome ${token.userInfo.firstname}`)
            }
            else{
                let errorMessage = await response.json()
                if (errorMessage && errorMessage.type ) {
                    toast.error(`${errorMessage.message}`)
                    return
                }
                    
            }
        } catch (e) {
            toast.error(`Username or password incorect`)
            console.log(e)
        }
        this.props.toggle()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);