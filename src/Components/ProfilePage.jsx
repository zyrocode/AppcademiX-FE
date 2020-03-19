import React, { Component } from 'react';
import { connect } from "react-redux"
import { getUsersWithThunk } from '../Actions/setUser'

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    loadUsers: (userInfos) => dispatch(getUsersWithThunk(userInfos))
})

class ProfilePage extends Component {
    state = {   
    }
    render() {
        return (
            <div>
                {this.props.userInfo && this.props.userInfo.map((user,index)=>
                    <div key={index}>
                        {user.username}
                    </div>
                )}

            </div>
        );
    }
    componentDidMount = async() => {
        let request = await fetch("http://localhost:9000/api/posts");
        let userInfos = await request.json();
        this.props.loadUsers(userInfos.postsList)
        console.log(this.props.userInfo)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

