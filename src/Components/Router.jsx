import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import PostPage from "./PostPage";
import CreatePost from "./CreatePost";
import Register from "./Register";
import ProfilePage from "./ProfilePage";
import NotFound from "./NotFound";
import NavBar from './NavBar'
import Loader from "./Loader";
import { refreshTokenAPI } from "../API/refresh"
import { connect } from "react-redux"
import { getUsersWithThunk } from '../Actions/setUser'

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  loadUsers: (userInfos, token) => dispatch(getUsersWithThunk(userInfos, token))
})

class RouterBrowse extends Component {
  state = {
    load: true

  }
  render() {
    return (
      <Router>
        {this.state.load
          ?
          <Loader />
          :
          <>
            <NavBar />
            <Switch>
              <Route path="/" exact component={PostPage} />
              <Route path="/profile/:username" exact component={ProfilePage} />
              <Route path="/createpost" exact component={CreatePost} />
              <Route path="/register" exact component={Register} />
              <Route component={NotFound} />
            </Switch>
            <ToastContainer autoClose={2000} position="top-center" />
          </>
        }
      </Router>
    );
  }

  componentDidMount = async () => {
    const access_token = localStorage.getItem("access_token");
    const username = localStorage.getItem("username");
    if (access_token && username) {
      const userJson = await refreshTokenAPI(access_token);
      this.props.loadUsers(userJson.userInfo, userJson.access_token)
    } else {
      localStorage.clear();
    }
    setTimeout(() => {
      this.setState({
        load: false
      })
    }, 1000);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterBrowse);
