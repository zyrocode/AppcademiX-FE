import React, { Component } from 'react';
import PostsList from './PostsList';
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
                               
                           <div className="col"> <PostsList posts={this.state.posts} refresh={()=>this.fetchPosts()}/></div>
                           </div>            
           </Container>
    
                </div>
          </div>
        );
    }

    componentDidMount = async() => { 
      await this.fetchPosts()
     
    }

    filterby = async(params)=>{
        try {
           if(params){
            let response = await fetch("http://localhost:9000/api/posts?sort="+ params)
           
            let posts = await response.json()
            const newPosts = posts.postsList
            console.log("our new PostList", newPosts)
      
            setTimeout(() => {
                this.setState({
                    posts: newPosts
                   })
            }, 200);

           }
           else{
            await this.fetchPosts()
           }
           
          }
            
         catch (error) {
            console.log(error)
          }  
    }

    fetchPosts = async () => {
      
        try {
          let response = await fetch("http://localhost:9000/api/posts?sort=ratingsCount")
          let posts = await response.json()
          const newPosts = posts.postsList
    
          setTimeout(() => {
              this.setState({
                  posts: newPosts.sort(function (a, b) { return b.ratingsCount - a.ratingsCount})
                 })
          }, 200);
        }
          
       catch (error) {
          console.log(error)
        }  
    }
}

export default PostPage;