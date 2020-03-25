import React, { Component } from 'react';
import { Container, Col, Fade, Row } from 'reactstrap'
import RatingsPage from './RatingsPage';
import PostModal from './PostModal';
// import FontAwesome from 'react-fontawesome'

let yesterday = new Date(new Date().setDate(new Date().getDate()-1));

class YesterdayPosts extends Component {
    state = {
        posts: [],
        postModal: false,
        selectedPost: undefined,
        curTime : yesterday.toISOString().substring(0, 10),
    }
    
    
    // this.setState = {
    //     posts: createdAt === curTime this.posts.filter(post => post.createdAt == curTime);
    // }
    render() {
        return (
            <Fade>
                
                <h2>Yesterday</h2>
                {this.state.postModal && <PostModal open={this.state.postModal} toggle={this.togglePostModal} post={this.state.selectedPost} />}
                { this.props.posts
                .filter(onePost=>onePost.createdAt.substring(0, 10) === this.state.curTime)
                
                
                .map((post, index) =>
                    <Container className="m-4 mx-auto post" key={index}>
                        <Row>
                            <div className="m-2">
                                <img className="post-image" src={post.image} alt="Post Default Pic" />
                            </div>
                            <Col>
                                <Row><h4>{post.title}</h4></Row>
                                <Row>{post.description}</Row>
                            </Col>
                            <RatingsPage id={post._id} refresh={this.props.refresh} count={post.ratingsCount}/>
                        </Row>
                    </Container>
                )}
            </Fade>
        );
    }

    togglePostModal = () => {
        this.setState({
            postModal: !this.state.postModal
        })
    }
    
}

export default YesterdayPosts;