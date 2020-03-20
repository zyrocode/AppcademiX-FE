import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Button,
    Fade
} from 'reactstrap';
import Login from './Login'

class NavBar extends Component {
    state = {
        loginModal: false
    }

    render() {
        return (
            <Fade>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Appcademix</NavbarBrand>
                    {localStorage.getItem("access_token") === ""
                        ? <Button onClick={this.toggleLoginModal}>Log in</Button>
                        : <Button onClick={this.toggleLogout}>Log out</Button>}
                </Navbar>
                {this.state.loginModal && <Login toggle={this.toggleLoginModal} open={this.state.loginModal} />}
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