import React, { Component } from "react";
import { Container, Col, Fade, Row } from "reactstrap";
import FontAwesome from "react-fontawesome";

class RatingsPage extends Component {
  state = {
    upVoteCount: 0,
    upVotedByUser: false
  };

  render() {

    return (
      <>
        <Col>
          <Row>
            <Col>
              {this.state.upVotedByUser === false ? (
                <span onClick={this.upRatePost} className="rate">
                  <FontAwesome name="star" size="2x" />
                  <span className="rate-number">{this.state.upVoteCount}</span>
                </span>
              ) : (
                <span onClick={this.downRatePost} className="rate">
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

  setStateForRatings = () => {
    this.setState(prevState => ({
      upVotedByUser: !prevState.upVotedByUser
    }));
  };

  countUpvotes = async id => {
    try {
      //http://localhost:9000/api/ratings/5e72afef19ef022fd996c4ef
      const allUpVotes = await fetch(`http://localhost:9000/api/ratings/${id}`);

      if (allUpVotes.ok) {
        const response = await allUpVotes.json();

        this.setState({
          upVoteCount: response.upVotalTotal
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
      } else {
        this.setState({
          upVoteCount: 0,
          upVotedByUser: false
        });
      }
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
        this.setStateForRatings();
        await this.countUpvotes(this.props.id);
        await this.props.refresh();
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
        this.setStateForRatings();
        await this.countUpvotes(this.props.id);
        await this.props.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default RatingsPage;
