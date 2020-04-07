import React, { Component } from "react";
import { Button, Comment,  Header } from "semantic-ui-react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Row, Input, Form, FormGroup, Col, Container} from "reactstrap";


class ReplyComponent extends Component {
  state = {
      comments:[],
      commentId:"",
      commentUsername:"",
      repliedBy:"",
      replyMsg:""
  };

  render() {
    console.log(this.props.comments)
    return (
        <Container className="mb-5">
      <Comment.Group threaded minimal >
        <Header as="h3" dividing>
          Comments
        </Header>

        { this.props.comments.length > 0 &&  this.props.comments.map((comment,i)=> (
            <Comment key={i}>
          <Comment.Avatar src={comment.userInfo.image}/>
          <Comment.Content>
            <Comment.Author as="a">{comment.userInfo.firstname} {comment.userInfo.lastname}
            {/* <small>
                                                <h6 style={{ fontSize: "small", paddingTop: "0.5em" }}><Link className="post-username" to={"/profile/" + comment.userInfo.username}>{"@" + comment.userInfo.username}</Link></h6>
                                                </small> */}
             </Comment.Author>
           
            <Comment.Metadata>
              <div><Moment fromNow>{comment.updatedAt}</Moment></div>
            </Comment.Metadata>
            <Comment.Text>{comment.comment}</Comment.Text>
            <Comment.Actions>
            <a>Edit</a>
            <a>Delete</a>
              <Comment.Action onClick={()=> this.setState({commentId: comment._id, commentUsername: comment.userInfo.username})}>Reply</Comment.Action>
            </Comment.Actions >
          </Comment.Content>

       {this.state.commentId === comment._id && <Form onSubmit={this.postReply}>
                                <Col>
                                <button type="button" className="close" aria-label="Close" onClick={() => this.setState({ commentId:"",
      commentUsername:"",
      repliedBy:"",
      replyMsg:"" })}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                    <FormGroup>  
                                        <Input type="text" onChange={(e) => this.setState({ replyMsg:  e.target.value })} value={this.state.replyMsg} placeholder= {`@ ${this.state.commentUsername} `}/>
         </FormGroup>
         <Button className="btn-modal-primary">Reply</Button>
     </Col>
 </Form> 
       }
            
            { comment.replies.length > 0 && comment.replies.map(reply=>
            
    <Comment.Group key={reply._id}>
    <Comment>
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
      <Comment.Content>
        <Comment.Author as="a">{reply.userInfo.username}</Comment.Author>
        <Comment.Metadata>
          <div><Moment fromNow>{reply.updatedAt}</Moment></div>
        </Comment.Metadata>
            <Comment.Text>{reply.reply}</Comment.Text>
        {/* <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions> */}
      </Comment.Content>
      </Comment>
      </Comment.Group>
                        ) }

        </Comment>))}


{/* 
        <Form reply>
          <Form.TextArea  value={this.state.commentId}/>
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form> */}
      </Comment.Group>

</Container>
    );
  }

  postReply=async ()=>{
try {
    let replyBody ={
        reply: this.state.replyMsg
    }
    // http://localhost:9000/api/reply/commentID
    let response = await fetch("http://localhost:9000/api/reply/" + this.state.commentId, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(replyBody)
    })

    if(response.ok){
        this.props.refresh()
    }

    this.setState({
        commentId:"",
         commentUsername:"",
         repliedBy:"",
         replyMsg:""
       })
    
} catch (error) {
    console.log(error)
    
}
    
   
  }



    componentWillMount=()=>{
        this.setState({
           comments: this.props.comments
        })
    }

    // componentDidMount=()=>{
        
    // }



}
export default ReplyComponent;
