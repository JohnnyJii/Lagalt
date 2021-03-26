import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Carou from '../../shared/LandCarousel'
import LandingMain from '../../shared/landingMain/LandingMain'
import LowerNav from '../../shared/navbar/LowerNav'
import './Landing.css'


function Landing() {


  return (
    <div  className="landing">
      <div>
      <Container>
        <Row>
          <Col></Col>
            <Col>
              <Carou />
            </Col>
          <Col></Col>
        </Row>
    </Container>
    </div>
    <br />
    <div>
      <LowerNav />
    </div>
      <div>
        <LandingMain />
      </div>
    </div>
  );
}

export default Landing;
