import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    Nav,
    Button,
    Fade,
    Toast, 
    ToastBody, 
    ToastHeader
} from 'reactstrap';
import Login from './Login'

class NavBar extends Component {
    state = {
        loginModal: false
    }

    render() {
        return (
            <Fade>
                <Navbar>
                    <NavbarBrand href="/">Appcademix</NavbarBrand>
                    <Nav className="mr-auto" >
                        <NavItem>
                            <NavLink href="http://localhost:3000/">Home</NavLink>
                        </NavItem>
                        {localStorage.getItem("access_token") !== "" &&
                            <NavItem>
                                <NavLink href={"http://localhost:3000/profile/" + localStorage.getItem("username")}>Profile</NavLink>
                            </NavItem>}
                    </Nav>
                    {localStorage.getItem("access_token") === ""
                        ? <Button onClick={this.toggleLoginModal}>Log in</Button>
                        : <Button onClick={this.toggleLogout}>Log out</Button>}
                </Navbar>
                {this.state.loginModal && <Login toggle={this.toggleLoginModal} open={this.state.loginModal} />}
                {/* <div style={{position: "absolute"}} className="p-3 mb-2 rounded toast">
                    <Toast>
                        <ToastHeader>
                            Appcademix
                        </ToastHeader>
                        <ToastBody>
                            Logged out successfully!
                        </ToastBody>
                    </Toast>
                </div> */}
            </Fade>
        );
    }

    toggleLoginModal = () => this.setState({ loginModal: !this.state.loginModal })

    toggleLogout = () => {
        localStorage.setItem("access_token", "")
        localStorage.setItem("username", "")
        this.setState({})
    }
}

export default NavBar;