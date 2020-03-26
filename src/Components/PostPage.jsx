import React, { Component } from 'react';
import PostsList from './PostsList';
import { toast } from 'react-toastify'
import { Row, Col, Container } from 'reactstrap';
import FontAwesome from "react-fontawesome";
import FilterComponent from './FilterComponent';
import { connect } from "react-redux"
import { refreshTokenAPI } from "../API/refresh"
import { getUsersWithThunk } from '../Actions/setUser'

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    loadUsers: (userInfos, token) => dispatch(getUsersWithThunk(userInfos, token))
})

class PostPage extends Component {
    state = {
        posts: []
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Container>
                        <div className="row">
                            <div className=" col-md-2 col-lg-1 col-sm-12 col-xs-12">
                                <Container className="mx-auto"> <FilterComponent filter={this.filterby} /> </Container>
                            </div>
                            <div className="col">
                                <PostsList posts={this.state.posts} refresh={() => this.fetchPosts()} section={"today"}/>
                                <PostsList posts={this.state.posts} refresh={() => this.fetchPosts()} section={"yesterday"}/>
                                <PostsList posts={this.state.posts} refresh={() => this.fetchPosts()}/>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps.accessToken !== this.props.accessToken) {
            await this.filterby()
            console.log("POST UPDATED")
        }
    }

    componentDidMount = async () => {
        let search = new URLSearchParams(this.props.location.search)
        const access_token = search.get("token")
        const userName = search.get("username")
        if (access_token && userName) {
            const userJson = await refreshTokenAPI(access_token);
            this.props.loadUsers(userJson.userInfo, userJson.access_token)
            localStorage.setItem("access_token", userJson.access_token)
            localStorage.setItem("username", userJson.userInfo.username)
            toast.success(`Welcome ${userJson.userInfo.firstname}`)
        }
        await this.filterby()
    }

    filterby = async (params) => {
        try {
            if (params) {
                let response = await fetch(`http://localhost:9000/api/posts?sort=${params}&number=1`)
                let posts = await response.json()
                const newPost = posts.postsList
                this.setState({
                    posts: newPost
                })
            }
            else {
                await this.fetchPosts()
                console.log("no params so ran the fetchpost")
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    fetchPosts = async () => {
        try {
            let response = await fetch("http://localhost:9000/api/posts?sort=ratingsCount")
            let posts = await response.json()
            const newPosts = posts.postsList
            this.setState({
                posts: newPosts
            })
        }catch(e){
            console.log(e)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);