import React, { Component } from 'react';
import { Col, Row,Container } from 'reactstrap'
import { Link } from 'react-router-dom'

class SideSection extends Component {
    state = {
        posts: []
    }
    render() {
        return (
            <div className="side-section">
                <h4>Most Viewed Posts</h4>
                {this.state.posts.length > 0 &&
                    this.state.posts.map((post, index) =>
                        <Row key={index} className="most-viewed-post">
                            <Col>
                                <Link to={"/post/" + post._id} className="mt-2 link-side-section">
                                    <h6>{post.title}</h6>
                                </Link>
                            </Col>
                            <Col className="col-3 number-view-side-section">
                                <h5>{post.views}</h5>
                            </Col>
                        </Row>)}
                <h4>Popular Hashtags</h4>
                <Row>
                        {this.state.tags &&
                            this.state.tags.map((tag, index) => <span style={{ padding: "0.4em",fontSize: Math.floor(Math.random() * (20 - 15) + 15) }}><Link className="post-hashtag"  to={"/tags/" + tag}>{"#" + tag}</Link></span>)}
                </Row>
            </div>);
    }

    componentDidMount = async () => {
        try {
            let response = await fetch("http://localhost:9000/api/posts/all")
            let posts = await response.json()
            let tags = []
            posts.forEach(post => { if (post.tags[0]) tags.push(post.tags[0]) })
            console.log(tags)
            posts.sort((a, b) => b.views - a.views)
            this.setState({
                posts: posts.slice(0, 5),
                tags: tags
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export default SideSection;