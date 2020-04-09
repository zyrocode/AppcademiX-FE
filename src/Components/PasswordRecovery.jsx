import React, { Component } from 'react';
import { Button, Col, Row, Fade, Container, Form, FormGroup, Label, Input, Alert, Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap';
import {Link, withRouter} from 'react-router-dom'
import { toast } from 'react-toastify'

class PasswordRecovery extends Component {

    state = {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        errorMessage: "",
        token:"",
        passModalIsOpen: false,
        secondModalOpen:false,
        openPwdReset : false
    }

    render() {
       console.log("render")
        return (
        <Fade>
             <Row>
                    { this.state.passModalIsOpen &&

                            <Modal isOpen={this.state.passModalIsOpen} toggle={this.cancelModal} >
                            <ModalHeader toggle={this.ccancelModal}></ModalHeader>
                            <ModalBody>
                            <Container className="register">
                                <Row>
                                    <Col>
                           
                                        { this.state.secondModalOpen 
                                        ? <> <h2 className="text-center">You've Got Mail</h2>
                                             <Container>
                                                <p>
                                                    Check your inbox. We've sent a link to reset your password to: <span style={{ color:"#EF3B59"}}> {this.state.email}</span>. 
                                              </p>
                                                 <p>
                                                 If you don't recieve this email in few minutes, please make sure it was            not sent to your spam folder.
                                                </p>       
                                            </Container> </>
                                        :
                                        <><h2 className="text-center">Forgotten your password?</h2>
                                    <Container>
                                        <Label>E-Mail</Label>
                                        <Input type="email" onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} placeholder="Type your registered email address"     
                                        style={{borderColor:"#EF3B59", borderRadius:"3em"}}   required />
                                     </Container> 
                                     </>}

                                     </Col>
                                </Row>
                            </Container>
                        </ModalBody>
                                { !this.state.secondModalOpen && <ModalFooter>
                                    <Button color="primary" onClick={this.cancelModal}>Cancel</Button>
                                    <Button color="danger" onClick={()=>this.sendPassReq(this.state.email)}>Reset Your Password</Button>
                                    </ModalFooter>}
                </Modal>}

                        {!this.state.passModalIsOpen && <Container> <Container>
                            <h2 className="text-center">Reset My Password</h2>
                           <Form onSubmit={this.submitPost}>
                           <FormGroup>
                                   <Label>Username</Label>
                                   <Input type="text" onChange={(e) => this.setState({ username: e.target.value })} value={this.state.username}  style={{borderColor:"#EF3B59", borderRadius:"3em", color:"#EF3B59"}} disabled valid/>
                                   
                            </FormGroup>
                            <FormGroup>
                                   <Label>Password</Label>
                                   <Input type="password" onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} required style={{borderColor:"#EF3B59", borderRadius:"3em"}}></Input>
                               </FormGroup>
                               <FormGroup>
                                   <Label>Confirm password</Label>
                                   <Input type="password" onChange={(e) => this.setState({ confirmPassword: e.target.value })} value={this.state.confirmPassword} required style={{borderColor:"#EF3B59", borderRadius:"3em"}}></Input>
                               </FormGroup>
                              <div className="mx-auto text-center m-5"> 
                              <Button className="btn-modal-primary rounded-pill w-50">Reset Password</Button>
                              </div>
                           </Form>
                       </Container> </Container>}
                    </Row>
            </Fade>    
        );
    }



    sendPassReq = async (emailForPassReset)=>{
        try {
            let reqBody = {
            email: emailForPassReset
            }

            let response = await fetch("http://localhost:9000/api/auth/forgotpwd", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reqBody)
            })

            if (response.ok) {
                this.setState({
                    secondModalOpen:true,
                })
                // toast.success(credentials.message)
                // this.props.history.push("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    cancelModal = () => {
        this.setState({
            passModalIsOpen: !this.state.passModalIsOpen,
        })
        this.props.history.push("/")
      }

      componentDidMount=()=>{
        let search = new URLSearchParams(this.props.location.search)
        const token = search.get("token")
        const username = search.get("username")
        console.log("mounted now")
        if(!token){
            this.setState({
                passModalIsOpen: true,
            })
        }
        else{
            this.setState({
                passModalIsOpen: false,
                username: username,
                token:token

            })
        }
      };

    //   componentWillUnmount() {
    //     this._isMounted = false;
    //   }


    submitPost = async (e) => {
        e.preventDefault()
        try {
            if(this.state.password === this.state.confirmPassword){
                let user = {
               
                    password: this.state.password
                }
    
                let response = await fetch("http://localhost:9000/api/auth/resetpassword", {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + this.state.token,
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                })
                let credentials = await response.json()
                if (response.ok) {
                    toast.success(credentials.message)
                    this.props.history.push("/")
                }
                else
                    toast.error("oops something went wrong, try again later")

                    setTimeout(() => {
                        this.props.history.push("/")
                    }, 2000);
                    
                if (credentials && credentials.type)
                    this.setState({
                        errorMessage: credentials
                    })
            } else{
                toast.error("The Confirm Password does not match the password you want to change")
            }
        } catch (ex) {

        }
    }
}

export default withRouter(PasswordRecovery) ;