import React, { Component } from 'react';
import Navbar from './Navbar';
import { Container, Card, Form,FormGroup,Label,Input } from 'reactstrap'

class addPostLink extends Component {
    render() {
        return (
            <>
                <Navbar />
                <h1 className="text-center font-weight-bolder my-4" >Submit a product</h1>
                <Container>
                    <Card  >
                        <Form>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="link" className="mr-sm-2  font-weight-bolder">Email</Label>
                                <Input type="url" name="link" id="exampleEmail" placeholder="Url of product(eg https://www.youtube.com)" />
                            </FormGroup>
                        </Form>
                    </Card>
                </Container>
            </>
        );
    }
}

export default addPostLink;