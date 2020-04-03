// import React from 'react';

// const TagDisplayComponent = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default TagDisplayComponent;


import React, { Component } from 'react';
import PostPage from './PostPage';
import { Fade, Container } from 'reactstrap';
import PostsList from './PostsList';


class TagDisplayComponent extends Component {
    state={
        posts:[]
    }
    render() {
        return (
            <>
                  {
                    <Fade>
                        <Container style={{maxWidth: "800px", marginTop: "1.5em"}}>
                    
                        {this.state.posts.length > 0
                            ?
                            <PostsList updateRates={(posts) => this.updateRatings(posts)} posts={this.state.posts} refresh={() => this.fetchPosts()} section={"hashtag"} tag={this.props.match.params.tag}/>
                            :
                            <span className="center-msg">No Post with this #hashtag!</span>
                        }
                        </Container>
                    </Fade>
                }
            </>
        );
    }
componentDidMount=async ()=>{
    // http://localhost:9000/api/posts/hastag/javascript
   try {
    await this.fetchPosts() 
   } catch (error) {
       console.log(error)
   }
   

}



// componentDidUpdate = async (prevProps, prevState) => {
//     if (prevProps.props.location.pathname !== this.props.location.pathname) {
//         await this.fetchPosts()
       
//     }
// } 

// componentDidMount = async () => {
//     let search = new URLSearchParams(this.props.location.search)
//     const access_token = search.get("token")
//     const userName = search.get("username")
//     if (access_token && userName) {
//         const userJson = await refreshTokenAPI(access_token);
//         this.props.loadUsers(userJson.userInfo, userJson.access_token)
//         localStorage.setItem("access_token", userJson.access_token)
//         localStorage.setItem("username", userJson.userInfo.username)
//         toast.success(`Welcome ${userJson.userInfo.firstname}`)
//         this.props.history.push("/")
//     }
//     await this.fetchPosts()
// }



fetchPosts = async () => {
    try {
        const tag = this.props.match.params.tag
        let response = await fetch(`http://localhost:9000/api/posts/hastag/${tag}`)
        let newPosts = await response.json()

        
        this.setState({
            posts: newPosts
        })



    } catch (e) {
        console.log(e)
    }
}

updateRatings = (posts) => {
    this.setState({
        posts: posts.sort((a, b) => b.ratings.length - a.ratings.length)
    })
}

};

export default TagDisplayComponent;