import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostPage from "./PostPage";
import ProfilePage from "./ProfilePage";
import NotFound from "./NotFound";
import CreatePost from "./CreatePost";
import Register from "./Register";

class RouterBrowse extends Component {
    state = {
        lightTheme: true
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={PostPage} />
                    <Route path="/profile/:username" exact component={ProfilePage} />
                    <Route path="/createpost" exact component={CreatePost} />
                    <Route path="/register" exact component={Register} />
                    <Route component={NotFound} />
                </Switch>
            </Router >
        );
    }

    refreshTokenAPI = async token => {
        try {
            const response = await fetch(
                "http://localhost:9000/api/auth/refreshtoken",
                {
                    headers: {
                        Authorization: "Bearer " + token
                    },
                    method: "POST"
                }
            );

            if (response.ok) return await response.json();
        } catch (error) {
            console.log(error);
        }
    };

    componentDidMount = async () => {
        const access_token = localStorage.getItem("access_token");
        const sessionToken = sessionStorage.getItem("access_token");

        if (access_token || sessionToken) {
            if (access_token) {
                console.log(access_token)
                const userJson = await this.refreshTokenAPI(access_token);

                localStorage.setItem("access_token", userJson.access_token);
                localStorage.setItem("username", userJson.username);
            } else {
                const userJson = await this.refreshTokenAPI(sessionToken);
                sessionStorage.setItem("access_token", userJson.access_token);
                sessionStorage.setItem("username", userJson.username);
            }
        } else {
            localStorage.clear();
            sessionStorage.clear();
            //   delete localStorage["access_token"];
            //   delete sessionStorage["access_token"];
        }
    };
}

export default RouterBrowse;
