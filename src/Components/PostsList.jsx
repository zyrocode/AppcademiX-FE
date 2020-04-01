import React, { Component } from 'react';
import { Container, Col, Fade, Row } from 'reactstrap'
import Login from './Login';
import PostModal from './PostModal';
import FontAwesome from "react-fontawesome";
import { connect } from 'react-redux'

const mapStateToProps = state => state

class PostsList extends Component {
    state = {
        posts: [],
        postModal: false,
        selectedPost: undefined,
        dateSection: undefined,
        today: new Date().toISOString().substring(0, 10),
        yesterday: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().substring(0, 10),
        title: undefined,
        openLogin: false
    }

    render() {
        return (
            <Fade>
                <div>
                    {this.state.postModal && <PostModal open={this.state.postModal} toggle={this.togglePostModal} post={this.state.selectedPost} refresh={this.props.refresh} />}
                    {this.state.posts && this.state.posts.length > 0 &&
                        <Container>
                            <h2>{this.state.title}</h2>
                            {this.state.posts.map((post, index) =>
                                <Container className="m-4 mx-auto post" onClick={() => { this.setState({ selectedPost: post }); this.togglePostModal() }} key={index}>
                                    <Row>
                                        <div className="m-2">
                                            <img className="post-image" src={post.image} alt="Post Default Pic" />
                                        </div>
                                        <Col>
                                            <Row><h4>{post.title}</h4></Row>
                                            <Row>{post.description}</Row>
                                            <Row>{post.difficulty + " - " + post.category}</Row>
                                            <Row> {
                                                
                                                post.tags.map((tag,i)=>
                                                   
                                                       <span key={i}>{ "#" + tag} &nbsp;</span>
                                                       
                                                    )
                                            }
                                             </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col>
                                                    <span onClick={(e) => this.ratePost(post, e)} className="rate">
                                                        <FontAwesome name="star" size="2x" />
                                                        <span className="rate-number">{post.ratingsCount}</span>
                                                    </span>
                                                    {/* {post.ratings.length > 0 && post.ratings.find(({ upvotedBy }) => upvotedBy === this.props.userInfo.username)
                                                        ?
                                                        <span onClick={this.ratePost(post)} className="rate2">
                                                            <FontAwesome name="star" size="2x" />
                                                            <span className="rate-number">{post.ratingsCount}</span>
                                                        </span>
                                                        :
                                                        <span onClick={this.ratePost(post)} className="rate">
                                                            <FontAwesome name="star" size="2x" />
                                                            <span className="rate-number"> {post.ratingsCount}</span>
                                                        </span>} */}
                                                    {!this.props.accessToken && this.state.openLogin && <Login toggle={() => this.setState({ openLogin: !this.state.openLogin })} open={this.state.openLogin} />}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            )}
                        </Container>}
                </div>
            </Fade>
        );
    } 

    componentDidMount = () => {
        if (this.props.posts.length > 0) {
            this.filterPosts(this.props.posts)
            console.log("mount IF")
        }
        console.log("mount NOT IF")
    }

    componentDidUpdate = (prevProps, prevStates) => {
        if (this.props.posts !== prevProps.posts || prevStates.posts.length !== this.state.posts.length) {
            this.filterPosts(this.props.posts)
            console.log("update IF")
        }
        console.log("update NOT IF")
    }

    checkUserRate = (post) => {
        let result = post.ratings.filter(post => post.upvotedBy === this.props.userInfo.username)
        console.log(result)
    }

    ratePost = async (post, e) => {
        e.stopPropagation()
        if (this.props.accessToken && this.props.userInfo.username) {
            let allPosts = this.props.posts
            console.log(allPosts)
            let ratingsFind = post.ratings.find(({ upvotedBy }) => upvotedBy === this.props.userInfo.username)
            console.log(ratingsFind)
            if (ratingsFind !== undefined) {
                try {
                    console.log("UNRATED")
                    var indexOfThePost = 0
                    var indexOfRating = 0
                    this.props.posts.forEach((singlePost, index) => {
                        if (singlePost._id == post._id)
                            indexOfThePost = index
                    })
                    allPosts[indexOfThePost].ratings.forEach((singleRating, index) => {
                        if (singleRating.upvotedBy == this.props.userInfo.username)
                            indexOfRating = index
                    })
                    allPosts[indexOfThePost].ratingsCount--
                    allPosts[indexOfThePost].ratings.splice(indexOfRating, 1)
                    this.props.updateRates(allPosts)
                    await fetch(
                        `http://localhost:9000/api/ratings/${
                        post._id
                        }/${this.props.userInfo.username}`,
                        {
                            method: "DELETE",
                            headers: {
                                Authorization: "Bearer " + this.props.accessToken,
                                "Content-Type": "application/json"
                            }
                        }
                    );
                } catch (e) {
                    console.log(e)
                }
            } else {
                try {
                    console.log("RATED")
                    var indexOfThePost = 0
                    this.props.posts.forEach((singlePost, index) => {
                        if (singlePost._id == post._id)
                            indexOfThePost = index
                    })
                    allPosts[indexOfThePost].ratingsCount++
                    let userUpRate = {
                        upvotedBy: this.props.userInfo.username
                    }
                    allPosts[indexOfThePost].ratings.push(userUpRate)
                    this.props.updateRates(allPosts)
                    await fetch(
                        `http://localhost:9000/api/ratings/${
                        post._id
                        }/${this.props.userInfo.username}`,
                        {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer " + this.props.accessToken,
                                "Content-Type": "application/json"
                            }
                        }
                    );
                } catch (e) {
                    console.log(e)
                }
            }
        } else {
            this.setState({
                openLogin: true
            })
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
export default connect(mapStateToProps)(PostsList);