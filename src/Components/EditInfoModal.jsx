import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';


class EditInfoModal extends Component {
    state = {
        firstname: "",
        lastname: ""
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.open} toggle={this.props.toggle} >
                    <ModalHeader toggle={this.props.toggle}>Appcademix</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.submitForm}>
                            <FormGroup>
                                <Label>First Name</Label>
                                <Input type="text" onChange={(e) => this.setState({ firstname: e.target.value })} value={this.state.firstname} required/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input type="text" onChange={(e) => this.setState({ lastname: e.target.value })} value={this.state.lastname} required/>
                            </FormGroup>
                            <Button style={{ backgroundColor: "#EF3C59", border: "1px solid #EF3C59" }}>Update</Button>{' '}
                            <Button style={{ float: "right" }} color="secondary" onClick={this.props.toggle}>Cancel</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    componentDidMount = async() => {
        let response = await fetch("http://localhost:9000/api/users/" + localStorage.getItem("username"))
        let profile = await response.json()
        this.setState({
            firstname: this.capFirst(profile.firstname),
            lastname: this.capFirst(profile.lastname)
        })
        console.log(profile)
    }

    capFirst = string => {
        if (string)
            return string.charAt(0).toUpperCase() + string.slice(1)
    }

    submitForm = async(e) => {
        e.preventDefault()
        let profile = {
            firstname: this.state.firstname,
            lastname: this.state.lastname
        }
        try {
            let response = await fetch("http://localhost:9000/api/users/" + localStorage.getItem("username"), {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access_token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
            })
            if (response.ok){
                this.props.toggle(profile)
            }
            else    
                console.log("Incorrect login")
        } catch (e) {
            console.log(e)
        }
    }
}

export default EditInfoModal;