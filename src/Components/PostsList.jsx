import React, { Component } from 'react';
import { Container, Col, Fade, Row } from 'reactstrap'
import RatingsPage from './RatingsPage';
import PostModal from './PostModal';

class PostsList extends Component {
    state = {
        posts: [],
        postModal: false,
        selectedPost: undefined,
        dateSection: undefined,
        today: new Date().toISOString().substring(0, 10),
        yesterday: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().substring(0, 10),
        title: undefined
    }

    render() {
        return (
            <Fade>
                <div>
                    {this.state.postModal && <PostModal open={this.state.postModal} toggle={this.togglePostModal} post={this.state.selectedPost} />}
                    {this.state.posts && this.state.posts.length > 0 &&
                        <Container>
                            <h2>{this.state.title}</h2>
                            {this.state.posts.map((post, index) =>
                                <Container className="m-4 mx-auto post" key={index}>
                                    <Row>
                                        <div className="m-2">
                                            <img className="post-image" src={post.image} alt="Post Default Pic" />
                                        </div>
                                        <Col onClick={() => { this.setState({ selectedPost: post }); this.togglePostModal() }}>
                                            <Row><h4>{post.title}</h4></Row>
                                            <Row>{post.description}</Row>
                                            <Row>{post.difficulty + " - " + post.category}</Row>
                                        </Col>
                                        <RatingsPage id={post._id} refresh={this.props.refresh} count={post.ratingsCount} />
                                    </Row>
                                </Container>
                            )}
                        </Container>}
                </div>
            </Fade>
        );
    }

    componentDidMount = () => {
        if(this.props.posts.length > 0){
            this.filterPosts(this.props.posts)
            console.log("hereee", this.props.posts)
        }
    }

    componentDidUpdate = (prevProps, prevStates) => {
        if (this.props.posts !== prevProps.posts) {
            this.filterPosts(this.props.posts)
            console.log("here", this.props.posts)
        }
    }

    filterPosts = (postsList) => {
        switch (this.props.section) {
            case "today": {
                let posts = postsList.filter(post => post.createdAt.substring(0, 10) === this.state.today)
                this.setState({
                    posts: posts,
                    title: "Today"
                })
            } break;
            case "yesterday": {
                let posts = postsList.filter(post => post.createdAt.substring(0, 10) === this.state.yesterday)
                this.setState({
                    posts: posts,
                    title: "Yesterday"
                })
            } break;
            default: {
                this.setState({
                    posts: postsList,
                    title: "All Posts"
                })
            } break;
        }
    }

    togglePostModal = () => {
        this.setState({
            postModal: !this.state.postModal
        })
    }
}

export default PostsList;