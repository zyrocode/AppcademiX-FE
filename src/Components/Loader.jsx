import React, { Component } from 'react';
import { Col, Container, Row, Fade } from 'reactstrap'
import Loader from 'react-loader-spinner'
import RubberBand from 'react-reveal/RubberBand';

class Loaders extends Component {
  render() {
    return (
                <Fade>
                <Container fluid style={{backgroundColor: "#181818", width: "100vw", height: "100vh"}} className="d-block text-center">
                    <Row >
                        <Col>
                          <img className="m-5" width="800px" src="https://i.postimg.cc/HLCnsx6y/Appcademix-Logo-Logotype-Magenta-Black2.png"/>
                          <Loader type="ThreeDots" color="#EF3C59" height={200} width={200} />
                        </Col>
                    </Row>
                </Container>
            </Fade>
    );
  }
}

export default Loaders;