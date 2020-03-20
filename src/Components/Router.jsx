import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PostPage from './PostPage'
import AddPost from './AddPost'
import ProfilePage from './ProfilePage'
import NotFound from './NotFound'

class Register extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={PostPage} />
                    <Route path="/addpost" exact component={AddPost} />
                    <Route path="/profile/:username" exact component={ProfilePage} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        );
    }

    componentDidMount = () => {
        
    }
}

export default Register;