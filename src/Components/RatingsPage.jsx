import React, { Component } from "react";
import { Container, Col, Fade, Row } from "reactstrap";
import FontAwesome from "react-fontawesome";

class RatingsPage extends Component {
  state = {
    upVoteCount: 0,
     upVotedByUser: true
  };

  render() {

    return (
      <>
        <Col>
          <Row>
            <Col>
              {!this.state.upVotedByUser ? (
                <span onClick={this.upRatePost} className="rate">
                  <FontAwesome name="star" size="2x" />
                  <span className="rate-number">{this.state.upVoteCount}</span>
                </span>
              ) : (
                <span onClick={this.downRatePost}  className="rate2">
                  <FontAwesome name="star" size="2x" />
                  <span className="rate-number"> {this.state.upVoteCount}</span>
                </span>
              )}
            </Col>
          </Row>
        </Col>
      </>
    );
  }

  componentDidMount = async () => {
    await this.countUpvotes(this.props.id);
  };

  componentDidUpdate = async (prevProps,prevState)=>{
    if(prevProps.id !== this.props.id){
        await this.countUpvotes(this.props.id);
    }
  }


  countUpvotes = async id => {
    try {
      //http://localhost:9000/api/ratings/5e72afef19ef022fd996c4ef
      const allUpVotes = await fetch(`http://localhost:9000/api/ratings/${id}`);
      const response = await allUpVotes.json();

      this.setState({
        // response.post.ratingsCount
      upVoteCount:response.post.ratingsCount
    });
       
        const upVotedByUserAvailable = response.post.ratings.find(
          user => user.upvotedBy === localStorage.getItem("username")
        );

        upVotedByUserAvailable
          ? this.setState({
              upVotedByUser: true
            })
          : this.setState({
              upVotedByUser: false
            });
    
     
    } catch (error) {
      console.log(error);
    }
  };

  upRatePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/ratings/${
          this.props.id
        }/${localStorage.getItem("username")}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json"
          }
        }
      );
      if (response.ok) {
       
            this.setState({
              upVotedByUser: true
            })
 
        await this.countUpvotes(this.props.id);
        await this.props.refresh();
        console.log("total", this.state.upVoteCount)
      }
    } catch (error) {
      console.log(error);
    }
  };

  downRatePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/ratings/${
          this.props.id
        }/${localStorage.getItem("username")}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json"
          }
        }
      );
      if (response.ok) {
        this.setState({
            upVotedByUser: false
          })
        await this.countUpvotes(this.props.id);
        await this.props.refresh();
        console.log("total", this.state.upVoteCount)
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default RatingsPage;
