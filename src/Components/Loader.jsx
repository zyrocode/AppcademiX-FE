import React, { Component } from 'react';
import { Col, Container, Row, Fade } from 'reactstrap'
import Loader from 'react-loader-spinner'


class Loaders extends Component {
  state = {
    darkmode: localStorage.getItem("darkMode"),
    urlImage: undefined
  }
  render() {
    return (
      <Fade>
        <Container fluid style={{backgroundColor: "#202020", width: "100vw", height: "100vh" }} className="d-block text-center">
          <Row>
            <Col className="logo-loading" style={{ marginTop: "200px" }}>
              <img className="m-5 logo-load" src="https://i.postimg.cc/wBv9fprP/Appcademix-Logo-Logotype-Magenta-White.png" alt="loading-logo" />
              <Loader type="TailSpin" color="#EF3C59" height={100} width={100} />
            </Col>
          </Row>
        </Container>
      </Fade>
    );
  }
  componentDidMount = () => {
    console.log(localStorage.getItem("darkMode"))
    if (localStorage.getItem("darkMode"))
      this.setState({
        urlImage: "https://i.postimg.cc/wBv9fprP/Appcademix-Logo-Logotype-Magenta-White.png"
      })
    else
      this.setState({
        urlImage: "https://i.postimg.cc/C5cB155y/Appcademix-Logo-Logotype-Magenta-Black.png"
      })
  }
}

export default Loaders;