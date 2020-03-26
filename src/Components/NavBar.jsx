import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    NavItem,
    Nav,
    Button,
    Fade,
    Input,
    Collapse

} from 'reactstrap';
import { toast } from 'react-toastify'
import { NavLink, Link } from 'react-router-dom'
import Login from './Login'
import RubberBand from 'react-reveal/RubberBand';

import  { connect } from "react-redux"


 import { getUsersWithThunk } from '../Actions/setUser' 

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    loadUsers: (userInfos,t) => dispatch(getUsersWithThunk(userInfos,t))
}) 


class NavBar extends Component {
    state = {
        loginModal: false,
        search: "",
        searchOpen: false,
        allPosts: [],
        postsFiltered: [],
        usersFiltered: [],
        allUsers: []
    }

    render() {
        return (
            <Fade>
                <Navbar>
                    <NavbarBrand href="/">
                        <RubberBand>
                            <img width="40px" src="https://i.postimg.cc/BnCc3QGK/Appaccademix-Logo-Magenta.png" />
                        </RubberBand>
                    </NavbarBrand>
                    <Nav className="mr-auto" >
                        <NavItem>
                            <Input placeholder="Search users, posts..." className="search-bar" type="text" value={this.state.search} onChange={(e) => this.searchFilter(e.target.value)} />
                            {this.state.searchOpen && <Collapse isOpen={this.state.searchOpen}>
                                <h5>Users</h5>
                                {this.state.usersFiltered && this.state.usersFiltered.length > 0
                                    ?
                                    this.state.usersFiltered.slice(0, 5).map((user, index) =>
                                        <p onClick={() => this.setState({ searchOpen: false, search: "" })} key={index}>
                                            <img width="30px" src={user.image}/>
                                            <Link to={"/profile/" + user.username} key={index}> {user.firstname + " " + user.lastname} </Link>
                                        </p>
                                    )
                                    :
                                    <p>No User Found</p>
                                }
                                <h5>Posts</h5>
                                {this.state.postsFiltered
                                    ?
                                    this.state.postsFiltered.slice(0, 5).map((post, index) =>
                                        <p key={index}> {post.title + " " + post.description} </p>)
                                    :
                                    <p>No Post Found</p>
                                }
                            </Collapse>}
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                        </NavItem>
                        {this.props.accessToken && localStorage.getItem("access_token") !== "" &&
                            <>
                                <NavItem>
                                    <NavLink className="nav-link" to={"/profile/" + localStorage.getItem("username")}>Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to={"/createpost"}>Create Post</NavLink>
                                </NavItem>
                            </>
                        }
                    </Nav> 
                    {!this.props.accessToken || localStorage.getItem("access_token") === "" 
                        ? <Button onClick={this.toggleLoginModal}>Log in / Register</Button>
                        : <Button onClick={this.toggleLogout}>Log out</Button>}
                </Navbar>
                {this.state.searchOpen &&
                    <div onClick={() => this.setState({ searchOpen: false })} className="background-layer">
                    </div>
                }
                {this.state.loginModal && <Login toggle={this.toggleLoginModal} open={this.state.loginModal} />}
            </Fade>
        );
    }

    toggleLoginModal = () => this.setState({ loginModal: !this.state.loginModal })

    toggleLogout = () => {
        localStorage.clear()
        this.props.loadUsers("","")
        this.setState({})
        toast.success(`Good bye`)
    }

    componentDidMount = async () => {
        try {
            let responseUsers = await fetch("http://localhost:9000/api/users")
            let users = await responseUsers.json()
            let responsePosts = await fetch("http://localhost:9000/api/posts/all")
            let posts = await responsePosts.json()
            if (responseUsers.ok || responsePosts.ok) {
                this.setState({
                    allPosts: posts,
                    allUsers: users
                })
            } else {
                console.log("error fetching posts/users", responsePosts, responseUsers)
            }
        } catch (e) {
            console.log(e)
        }
    }

    searchFilter = search => {
        if (search && search.length > 0) {
            try {
                this.setState({
                    search: search,
                    searchOpen: true
                })
                this.setState({
                    usersFiltered: this.state.allUsers.filter(user =>
                        user.firstname.toUpperCase().includes(search.toUpperCase()) ||
                        user.lastname.toUpperCase().includes(search.toUpperCase())),
                    postsFiltered: this.state.allPosts.filter(post =>
                        post.title.toUpperCase().includes(search.toUpperCase()) ||
                        post.description.toUpperCase().includes(search.toUpperCase()))
                })
            } catch (e) {
                console.log(e)
            }
        } else {
            this.setState({
                search: "",
                searchOpen: false
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (NavBar);
