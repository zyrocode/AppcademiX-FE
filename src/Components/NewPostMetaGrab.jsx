import React, { Component } from "react";
import { Row, Form, FormGroup, Label, Input, Container, Button } from "reactstrap";
import { ReactTinyLink } from "react-tiny-link";
import CreatePost from "./CreatePost"



class NewPostMetaGrab extends Component {
  state = {
    link: "",
    showImage: false,
    urlMetaTags: [],
    openMainForm: false

  };

  render() {
    return (<>
      {!this.state.openMainForm && (

        <Container className="m-5">
          <Row>
            {/* <Form onSubmit={this.handleSubmit}> */}
            <FormGroup>
              <Label for="exampleUrl">Paste the URL of the New Post</Label>
              <Input
                type="url"
                name="url"
                id="exampleUrl"
                placeholder="URL"
                value={this.state.link}
                onChange={this.isUrlValid}
              />
            </FormGroup>
            {/* <Button>Submit</Button>
        </Form> */}
            {this.state.showImage && this.state.link && (
              <ReactTinyLink
                cardSize="small"
                showGraphic={true}
                maxLine={2}
                minLine={1}
                url={this.state.link}
              />)}
            {
              this.state.link === null && (<h2> Invalid Url, try Again!</h2>)
            }
            {this.state.showImage && this.state.link &&
              (
                <div className="text-center m-5">
                  <Button onClick={() => this.handleMetaTag(this.state.link)}>Submit</Button>
                </div>)}
          </Row>
        </Container>)}
      {this.state.openMainForm && (<CreatePost data={this.state.urlMetaTags} link={this.state.link} />)}
    </>);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ showImage: true });
  };

  isUrlValid = (e) => {
    let userInput = e.currentTarget.value
    let res = userInput.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (res == null) {
      this.setState({ link: null })
    }
    else {
      this.setState({
        link: e.currentTarget.value,
        showImage: true
      })
    }
  };

  handleMetaTag = async (url) => {
    // http://localhost:9000/api/metatag?url=https://www.youtube.com/watch?v=93p3LxR9xfM
    const response = await fetch(`http://localhost:9000/api/metatag?url=${url}`)
    if (response.ok) {
      const urlData = await response.json()
      console.log(urlData)
      this.setState({
        urlMetaTags: urlData.value,
        openMainForm: true
      })
    }
  };

}

export default NewPostMetaGrab;
