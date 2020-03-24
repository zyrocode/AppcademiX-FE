import React, { Component } from 'react';
import PostsList from './PostsList';
import NavBar from './Navbar';

class PostPage extends Component {
    state = {
        posts: []
    }
    render() {
        return (
            <div>
                <NavBar/>
                <PostsList posts={this.state.posts} />
            </div>
        );
    }

    componentDidMount = async() => {
        await this.updateList()
    }

    updateList = async () => {
        let response = await fetch("http://localhost:9000/api/posts")
        let posts = await response.json()
        posts = posts.postsList
        let bla = posts.sort(function (a, b) { return b.ratings.length - a.ratings.length})
        console.log("lol", bla)
        this.setState({
            posts: posts
        })
        console.log(posts)
    }
}

export default PostPage;