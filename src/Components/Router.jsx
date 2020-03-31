import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import PostPage from "./PostPage";
import CreatePost from "./CreatePost";
import { Fade } from 'reactstrap'
import Register from "./Register";
import ProfilePage from "./ProfilePage";
import NotFound from "./NotFound";
import NavBar from './NavBar'
import Loader from "./Loader";
import { refreshTokenAPI } from "../API/refresh"
import { connect } from "react-redux"
import { getUsersWithThunk } from '../Actions/setUser'
import NewPostMetaGrab from "./NewPostMetaGrab";
import SinglePostPage from "./SinglePostPage";

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
            <Fade>
              <Switch>
                <Route path="/createpost" exact component={NewPostMetaGrab} />
                <Route path="/" exact component={PostPage} />
                <Route path="/profile/:username" exact component={ProfilePage} />
                <Route path="/post/:id" exact component={SinglePostPage}/>
                <Route path="/register" exact component={Register} />
                <Route component={NotFound} />
              </Switch>
            </Fade>
            <ToastContainer autoClose={2000} position="top-center" />
          </>
        }
      </Router>
    );
  }

  componentDidMount = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const username = localStorage.getItem("username");
      if (access_token && username) {
        const userJson = await refreshTokenAPI(access_token);
        if (!userJson || userJson === undefined)
          localStorage.clear();
        console.log(userJson)
        this.props.loadUsers(userJson.userInfo, userJson.access_token)
      } else {
        localStorage.clear();
      }
      setTimeout(() => {
        this.setState({
          load: false
        })
      }, 1000);
    } catch (e) {
      console.log(e)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterBrowse);
