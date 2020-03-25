import React, { Component } from 'react';
import PostsList from './PostsList';
import TodayList from './TodayPosts';
import { Row, Col, Container } from 'reactstrap';
import FontAwesome from "react-fontawesome";
import FilterComponent from './FilterComponent';

class PostPage extends Component {
    state = {
        posts: []
    }
    render() {
        return (

          <div className="container">
                <div className="row">
                   
           <Container>
               
           <div className="row">  
                          <div className=" col-md-2 col-lg-1 col-sm-12 col-xs-12">  
                             <Container className="mx-auto"> <FilterComponent  filter={this.filterby}/> </Container>
                              </div>
                               
                           <div className="col">
                             <TodayList posts={this.state.posts} />
                             <PostsList posts={this.state.posts} refresh={()=>this.fetchPosts()}/>
             </div>
                           </div>            
           </Container>
    
                </div>
          </div>
        );
    }

    componentDidMount = async () => {
        await this.fetchPosts()
        console.log("mounted")
    }

    filterby = async(params)=>{
        try {
           if(params){
               console.log("stringify params",params)
            let response = await fetch(`http://localhost:9000/api/posts?sort=${params}&number=1`)
          
           
            let posts = await response.json()
            const newPost = posts.postsList
            console.log("our new PostList", newPost)
      
            setTimeout(() => {
                this.setState({
                    posts: newPost
                   })
            }, 200);
           }
           else{
               console.log("no params")
            await this.fetchPosts()
           }
           
          }
            
         catch (error) {
            console.log(error)
          }  
    }

    fetchPosts = async () => {
        try {

            // http://localhost:9000/api/posts?sort=category&number=-1
          let response = await fetch("http://localhost:9000/api/posts?sort=ratingsCount")
          let posts = await response.json()
           const newPosts = posts.postsList
            // const nowPost = newPosts.sort(function (a, b) { return b.ratingsCount - a.ratingsCount})
          setTimeout(() => {
              this.setState({
                  posts: newPosts
                 })
          }, 200);
        }
       catch (error) {
          console.log(error)
        }  
    }
}

export default PostPage;