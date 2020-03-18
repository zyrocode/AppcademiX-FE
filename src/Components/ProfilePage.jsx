import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setUser } from '../Actions/setUser'

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    setUser: (userInfos) => dispatch(setUser(userInfos))
})

class ProfilePage extends Component {
    state = {

    }
    render() {
        return (
            <div>
                {this.props.user[0] && this.props.user[0].username}

            </div>
        );
    }
    componentDidMount = async() => {
        let request = await fetch("http://localhost:9000/");
        let userInfos = await request.json();
        this.props.setUser(userInfos)
        console.log(this.props.user)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);